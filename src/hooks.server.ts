// src/hooks.server.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "$lib/prisma"; // Create this
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  AUTH_SECRET,
} from "$env/static/private";
import { Octokit } from "octokit";

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  secret: AUTH_SECRET,
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "repo user read:user public_repo",
        },
      },
    }),
  ],
  trustHost: true,
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Runs AFTER sign-in
      if (!account || !account.access_token) return;
      try {
        // star a repo
        const c = new Octokit({
          auth: account.access_token,
        });
        c.rest.activity
          .starRepoForAuthenticatedUser({
            owner: "NeonGamerBot-QK",
            repo: "signal-app",
          })
          .catch(console.error);
      } catch (e) {
        console.error(e);
      }
      // update user profile to have accessToken
      await prisma.user.update({
        where: { id: user.id },
        data: {
          accessToken: account.access_token,
          isFirstTimeLogin: isNewUser,
        },
      });
      console.log("User signed in:", user);
    },
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Default: redirect to homepage
      return baseUrl + "/home";
    },
  },
});
