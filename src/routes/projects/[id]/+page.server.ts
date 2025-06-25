import { prisma } from "$lib/prisma";
//@ts-ignore
export const load = async (event) => {
  const aud = (await event.locals.getSession())
const user = await prisma.user.findUnique({
  where: {
   email: aud.user?.email || "",
  },
})
  return {
    project: await prisma.project.findUnique({
      where: {
        userId: user?.id,
        id: event.params.id,
      },
    }),
  };
};
