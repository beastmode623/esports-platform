import { NextRequest, NextResponse } from 'next/server';
import passport from '@/lib/passport';

// Явно указываем, что функция возвращает Promise<NextResponse>
export async function GET(req: NextRequest): Promise<NextResponse> {
  return new Promise<NextResponse>((resolve) => {
    const baseUrl = process.env.NEXTAUTH_URL || req.nextUrl.origin;
    
    passport.authenticate('steam', {
      failureRedirect: `${baseUrl}/`,
    })(req as any, {} as any, () => {
      resolve(NextResponse.redirect(`${baseUrl}/dashboard`));
    });
  });
}