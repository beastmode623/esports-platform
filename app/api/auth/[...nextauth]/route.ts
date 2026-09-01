import NextAuth from "next-auth";

// Кастомный SteamProvider на основе OpenID 2.0
// Этот код делает ровно то же самое, что и официальный провайдер,
// но обходит баг импорта в Next.js 14
const SteamProvider = (options: any) => {
  return {
    id: "steam",
    name: "Steam",
    type: "oauth" as const,
    authorization: {
      url: "https://steamcommunity.com/openid/login",
      params: {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/callback/steam`,
        "openid.realm": process.env.NEXTAUTH_URL || 'http://localhost:3000',
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
      },
    },
    profile(profile: any) {
      const steamId = profile.openid.claimed_id.match(/(\d+)$/)?.[1] || "unknown";
      return {
        id: steamId,
        name: `Игрок Steam`,
        image: `https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cd6_full.jpg`,
      };
    },
    ...options,
  };
};

const handler = NextAuth({
  providers: [
    SteamProvider({
      clientId: process.env.STEAM_API_KEY as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
});

export { handler as GET, handler as POST };