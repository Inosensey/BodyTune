"use client"

// Component
import { Input } from "@/components/reusableComponent/formInputs/input"

//Types
interface registerInputTypes {
    email: string
  }
interface props {
    email: string,
    setRegisterInput: React.Dispatch<React.SetStateAction<registerInputTypes>>
}
const FirstStep = ({email, setRegisterInput}:props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setRegisterInput((prev) => ({...prev, [name]: value}))
    }

  return (
    <div className="flex flex-col justify-center mx-auto gap-4 max-w-[450px] phone:w-8/12">
        <div className="w-full">
            <Input
              name="email"
              dataTestId="email-input"
              placeholder="Enter your Email"
              state={email}
              type="email"
              label="Email"
              onChange={onChange}
              autoComplete="off"
            />
          </div>
    </div>
  )
}

export default FirstStep