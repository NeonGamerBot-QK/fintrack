import { prisma } from "$lib/prisma";

//@ts-ignore
export const load = async (event) => {
  return {
    projects: await prisma.projects.findMany({
        where: {
            userId: event.locals.user?.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
  };
};
