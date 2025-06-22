import { prisma } from "$lib/prisma";
import { json } from "@sveltejs/kit";
import { Octokit } from "octokit";

export async function GET(req: Request) {
    //@ts-ignore
const authData = await req.locals.auth()
// get users session token
// from auth.js cookie
if (!authData.user) {
    return new Response("Unauthorized", { status: 401 });
}
const userData = await prisma.user.findUnique({
    where: { email: authData.user.email },
    select: {
        // id: true,
        // email: true,
        // name: true,
        accessToken: true,
    },
})
console.log(userData)
const octokit = new Octokit({
    auth: userData?.accessToken,
})
const repo_data = await octokit.rest.repos.listForAuthenticatedUser({
    type: "owner",
    sort: "created",
    direction: "desc",
    per_page: 10,
})
return json({
    //@ts-ignore
repos: repo_data.data,
})
}