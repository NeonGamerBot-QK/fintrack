import { prisma } from "$lib/prisma";

export async function GET(req: Request) {
    // @ts-ignore
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
    return prisma.project.findMany({
          where: {
            userId:userData.id ,
          },
          orderBy: {
            createdAt: "desc",
          },
        })
}