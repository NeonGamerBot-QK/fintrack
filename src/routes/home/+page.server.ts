import { prisma } from "$lib/prisma";

//@ts-ignore
export const load = async (event) => {
const aud = (await event.locals.getSession())
const user = await prisma.user.findUnique({
  where: {
   email: aud.user?.email || "",
  },
  include: {
    projects: true,
  },
})
  return {
    projects: user?.projects,
  };
};