import { prisma } from "$lib/prisma";
//@ts-ignore
export const load = async (event) => {
  return {
    project: await prisma.project.findUnique({
      where: {
        userId: event.locals.user?.id,
        id: event.params.id,
      },
    }),
  };
};
