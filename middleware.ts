import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabaseUpdateSession";
import { createSSR } from "./utils/supabaseSSR";

export async function middleware(request: NextRequest) {
  const supabase = await createSSR()
  const user = await supabase.auth.getUser();
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.rewrite(new URL("/login", request.url));
    } else {
      const userHaverPersonalInformation = await checkIfUserHaverPersonalInformation(user.data.user!.id)
      if(!userHaverPersonalInformation) {
        return NextResponse.rewrite(new URL("/profileSetup", request.url));
      }
      // const cookieStore = await cookies();
      // const userHaverPersonalInformation = cookieStore.get(
      //   "userHaverPersonalInformation"
      // );
      // if (userHaverPersonalInformation!.value === "false") {
      //   return NextResponse.rewrite(new URL("/profileSetup", request.url));
      // }
    }
  }
  // update user's auth session
  return await updateSession(request);
}

const checkIfUserHaverPersonalInformation = async (userId: string) => {
  const supabase = await createSSR()
  try {
    const {data, error} = await supabase.from("personal_information").select("id").eq("user_id", userId)
    
    if (error) {
      const errorMessage: string = `There is an error getting your personal Information: ${error.message}`;
      return {
        message: errorMessage,
      };
    }
    if(data.length === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error getting your personal information: ${error.message}`
        : "An unknown error occurred";
    return {
      message: errorMessage,
    };
  }
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/dashboard/:path*",
    "/dashboard",
  ],
};
