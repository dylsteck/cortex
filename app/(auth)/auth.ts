import { compare } from "bcrypt-ts";
import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByFid } from "@/db/queries";

import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  user: User;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Sign in with Neynar",
      credentials: {
        fid: { label: "Fid", type: "number" },
        username: { label: "Username", type: "text" },
        name: { label: "Name", type: "text" },
        bio: { label: "Bio", type: "text" },
        verified_address: { label: "Verified address", type: "text" },
        signer_uuid: { label: "Signer UUID", type: "text" },
        pfp_url: { label: "Pfp Url", type: "text" },
        is_authenticated: { label: "Is Authenticated", type: "boolean" },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;
        let users = await getUserByFid(credentials.fid);
        if (users.length === 0) return null;
        return users[0] as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { signer_uuid, ...userWithoutSignerUuid } = user as any;
        token.user = userWithoutSignerUuid;
      }
      
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user = token.user as User;
      }

      return session;
    },
  },
});