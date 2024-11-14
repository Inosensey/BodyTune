import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
// The client you created from the Server-Side Auth instructions
import { createSSR } from '@/utils/supabaseSSR'

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

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createSSR()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const user = await supabase.auth.getUser();
      const userHaverPersonalInformation = await checkIfUserHaverPersonalInformation(user.data.user!.id)
      
      const cookieStore = await cookies()
      if(userHaverPersonalInformation) {
        cookieStore.set('userHaverPersonalInformation', "true", { secure: true })
      } else {
        cookieStore.set('userHaverPersonalInformation', "false", { secure: true })
      }

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}