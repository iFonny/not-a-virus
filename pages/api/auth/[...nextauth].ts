import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { generageDefaultApiKey } from "api/users";
import NextAuth from "next-auth";

import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "../../../prisma";

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

	adapter: PrismaAdapter(prisma as any),

	pages: {
		signIn: "/auth/signin",
	},

	// The secret should be set to a reasonably long random string.
	// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
	// a separate secret is defined explicitly for encrypting the JWT.
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async jwt({ token, user, account }) {
			if (user?.id) token.id = user.id;
			if (user?.role) token.role = user.role;
			if (user?.apiKey) token.apiKey = user.apiKey;

			return token;
		},
		async session({ session, token, user }) {
			if (user?.id) session.user.id = user.id;
			if (user?.role) session.user.role = user.role;
			if (user?.apiKey) session.user.apiKey = user.apiKey;

			return session;
		},
	},

	events: {
		async signIn({ user, profile }) {
			if (user?.id) {
				if (!user?.apiKey) await generageDefaultApiKey(user.id).catch(() => {});

				// Update profile picture
				if (profile?.image != user.image)
					await prisma.user.update({
						where: { id: user.id },
						data: { image: profile.image },
					});
			}
		},
	},

	// Enable debug messages in the console if you are having problems
	debug: false,
});
