"use client"

// Components
import { Input } from '@/components/reusableComponent/formInputs/input'

// icons
import IcOutlineArrowBackIosNew from '@/icons/IcOutlineArrowBackIosNew'

// Types
interface registerInputTypes {
  email: string,
  password: string
}
interface props {
  progressTitle: string,
  password: string,
  setRegisterInput: React.Dispatch<React.SetStateAction<registerInputTypes>>
  currentProgress: number,
  totalProgress: number,
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const SecondStep = ({password, setRegisterInput, progressTitle, currentProgress, totalProgress, setProgress}: props) => {

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setRegisterInput((prev) => ({...prev, [name]: value}))
  }

  return (
    <div className="flex flex-col justify-center mx-auto gap-8 max-w-[450px] phone:w-8/12 mt-4">
        <div className='flex items-center gap-4 cursor-pointer' onClick={() => setProgress(prev => prev - 1) } >
          <IcOutlineArrowBackIosNew color='#4B6F64' width='1.7em' height='1.7em' />
          <div>
            <p className='text-[#ccc] font-dmSans font-semibold text-sm'>Step {currentProgress} of {totalProgress}</p>
            <p className='font-quickSand font-bold'>{progressTitle}</p>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div className="w-full relative">
            <Input
              dataTestId="password-input"
              name="password"
              placeholder="Enter your Password"
              state={password}
              type="password"
              label="Password"
              onChange={onChange}
              autoComplete="off"
            />
          </div>
          <div className='text-sm flex flex-col gap-1'>
            <label>Your password must contain at least</label>
            <ul className='flex flex-col gap-1'>
              <li className='flex items-center gap-2'><div className='border-2 w-3 h-3 rounded-2xl'></div> 1 letter</li>
              <li className='flex items-center gap-2'><div className='border-2 w-3 h-3 rounded-2xl'></div> 1 number</li>
              <li className='flex items-center gap-2'><div className='border-2 w-3 h-3 rounded-2xl'></div> 1 number or special character (example: # ? ! &)</li>
              <li className='flex items-center gap-2'><div className='border-2 w-3 h-3 rounded-2xl'></div> At least 8 characters</li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default SecondStep