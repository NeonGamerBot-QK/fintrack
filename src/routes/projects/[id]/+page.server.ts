import { prisma } from "$lib/prisma";
import { Octokit } from "octokit";
//@ts-ignore
export const load = async (event) => {
  const aud = await event.locals.getSession();
  const user = await prisma.user.findUnique({
    where: {
      email: aud.user?.email || "",
    },
  });
  const project = await prisma.project.findUnique({
    where: {
      userId: user?.id,
      id: event.params.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      repo_id: true,
      repo_full_name: true,
      isAi: true,
      isPersonal: true,
      isPublic: true,
      isArchived: true,
    },
  });

  let languages = null;
  if (project && project.repo_full_name && user) {
    // Get user's access token
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { accessToken: true },
    });
    if (dbUser?.accessToken) {
      const octokit = new Octokit({ auth: dbUser.accessToken });
      try {
        const { data } = await octokit.rest.repos.listLanguages({
          owner: project.repo_full_name.split("/")[0],
          repo: project.repo_full_name.split("/")[1],
        });
        languages = data;
      } catch (e) {
        languages = null;
      }
    }
  }

  // Fetch all other projects for the user
  const otherProjects = await prisma.project.findMany({
    where: {
      userId: user?.id,
      NOT: { id: event.params.id },
    },
    select: {
      id: true,
      name: true,
      repo_full_name: true,
      description: true,
    },
  });

  // Fetch language stats for each other project
  let similarProjects = [];
  if (languages && otherProjects.length > 0 && user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { accessToken: true },
    });
    if (dbUser?.accessToken) {
      const octokit = new Octokit({ auth: dbUser.accessToken });
      // For each project, fetch language stats and compute overlap
      const currentLangs = Object.keys(languages);
      const scored = [];
      for (const proj of otherProjects) {
        let projLangs = [];
        if (proj.repo_full_name) {
          try {
            const { data } = await octokit.rest.repos.listLanguages({
              owner: proj.repo_full_name.split("/")[0],
              repo: proj.repo_full_name.split("/")[1],
            });
            projLangs = Object.keys(data);
          } catch (e) {
            projLangs = [];
          }
        }
        // Score by number of overlapping languages
        const overlap = projLangs.filter((l) =>
          currentLangs.includes(l),
        ).length;
        scored.push({ ...proj, overlap });
      }
      // Sort by overlap descending, take top 3
      similarProjects = scored
        .filter((p) => p.overlap > 0)
        .sort((a, b) => b.overlap - a.overlap)
        .slice(0, 3);
    }
  }

  return {
    project,
    languages,
    similarProjects,
  };
};
