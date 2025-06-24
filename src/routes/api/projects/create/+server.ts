import { prisma } from "$lib/prisma";

export async function POST(req: Request) {
  //@ts-ignore
  const authData = await req.locals.auth();
  // get users session token
  // from auth.js cookie
  if (!authData.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userData = await prisma.user.findUnique({
    where: {
      email: authData.user.email,
    },
  });
  if (!userData) {
    return new Response("User not found", { status: 404 });
  }
    // check body
    //@ts-ignore
const body = await req.request.json();

await prisma.project.create({
    data: {
        name: body.name,
        repo_id: body.gh_repo.toString() || null,
        description: body.description || "",
        isPersonal: body.isPersonal || false,
        isAi: body.isAi || false,
        userId: userData.id,
    }
})

return new Response("Project created successfully", { status: 201 });
}
