//@ts-ignore
export const load = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
