import { NextRequest, NextResponse } from 'next/server';
import passport from '@/lib/passport';

export async function GET(req: NextRequest) {
  return new Promise((resolve) => {
    // Получаем абсолютный базовый URL (http://localhost:3000)
    const baseUrl = process.env.NEXTAUTH_URL || req.nextUrl.origin;
    
    passport.authenticate('steam', {
      failureRedirect: `${baseUrl}/`, // <-- ИСПРАВЛЕНО: абсолютный URL
    })(req as any, {} as any, () => {
      resolve(NextResponse.redirect(`${baseUrl}/dashboard`)); // <-- ИСПРАВЛЕНО: абсолютный URL
    });
  });
}