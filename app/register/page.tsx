"use server"

import SignUp from "@/components/authComponents/signUp/SignUp"

const Register = async () => {
  return (
    <div  className="w-full h-full flex items-center justify-center"><SignUp /></div>
  )
}

export default Register