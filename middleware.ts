import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Копируем cookies из запроса в ответ
  const cookies = request.cookies;
  cookies.getAll().forEach(cookie => {
    response.cookies.set(cookie.name, cookie.value, {
      path: cookie.path || '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  });
  
  return response;
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
  ],
};