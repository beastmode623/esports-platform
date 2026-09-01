import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Упрощенный middleware для Cloudflare Pages
// Passport работает без него в serverless-окружении
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
  ],
};