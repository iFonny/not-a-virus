import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, RoleEnum } from '@prisma/client';

import DiscordProvider from 'next-auth/providers/discord';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) (global as any).prisma = new PrismaClient();
  prisma = (global as any).prisma;
}

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

  pages: {
    signIn: '/auth/signin',
  },

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
    async session({ session, token, user }) {
      console.log('user', user);
      console.log('token', token);
      console.log('session', session);
      if (user?.id) session.user.id = user.id;
      if (user?.role) session.user.role = user.role;
      if (user?.apiKey) session.user.apiKey = user.apiKey;

      return session;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
