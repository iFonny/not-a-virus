import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, RoleEnum } from '@prisma/client';

import DiscordProvider from 'next-auth/providers/discord';

const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      console.log('je viens ici ?', user);
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      if (user?.apiKey) token.apiKey = user.apiKey;

      return token;
    },
    async session({ session, token }) {
      console.log('token', token);
      console.log('session', session);
      if (token?.id) session.user.id = token.id;
      if (token?.role) session.user.role = token.role;
      if (token?.apiKey) session.user.apiKey = token.apiKey;

      return session;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
