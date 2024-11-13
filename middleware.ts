import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabaseUpdateSession'
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (request.cookies.getAll().length === 0) {
      return NextResponse.rewrite(new URL("/", request.url));
    } else {
      const cookieStore = await cookies()
      const userHaverPersonalInformation = cookieStore.get('userHaverPersonalInformation')
      if(userHaverPersonalInformation!.value === "false") {
        return NextResponse.rewrite(new URL("/profileSetup", request.url));
      }
    }
  }
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}