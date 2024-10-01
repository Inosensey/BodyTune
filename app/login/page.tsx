"use server"


// Components
import SignIn from "@/components/authComponents/signIn/SignIn"

const LoginPage = async () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SignIn />
    </div>
  )
}

export default LoginPage