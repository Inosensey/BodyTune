"use client"

// Actions
import { signOut } from "@/actions/authActions";

const SignOut = () => {
  return (
    <button onClick={() => signOut()}>Sign Out</button>
  )
}

export default SignOut