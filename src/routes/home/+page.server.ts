import { prisma } from "$lib/prisma";

//@ts-ignore
export const load = async (event) => {
  return {
    projects: await prisma.project.findMany({
      where: {
        userId: event.locals.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  };
};
export const actions = {
  createProject: async ({ request, locals }) => {
    const session = await locals.auth();
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
  },
};
