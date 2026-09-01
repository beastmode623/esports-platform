import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

if (!passport._strategy('steam')) {
  passport.use(
    new SteamStrategy(
      {
        returnURL: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/steam/return`,
        realm: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        apiKey: process.env.STEAM_API_KEY as string,
      },
      (identifier: string, profile: any, done: any) => {
        const user = {
          id: profile.id,
          displayName: profile.displayName,
          photos: profile.photos,
        };
        return done(null, user);
      }
    )
  );
}

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

export default passport;