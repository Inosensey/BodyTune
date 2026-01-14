"use client"

interface props {
  LoadingAnimationIcon: React.ReactNode
  message: string
  isLoading: boolean
}

const LoadingPopUp = ({message, isLoading, LoadingAnimationIcon}:props) => {
  return (
    <div className={`${isLoading ? "fixed" : "hidden"} top-0 left-0 z-[100] bg-black/[0.5] w-screen h-screen flex justify-center items-center`}>
      <div className='bg-primary flex flex-col items-center justify-center rounded-lg min-w-[300px] max-w-[450px] phone:w-11/12 laptop:w-9/12'>
        {LoadingAnimationIcon}
        <p className='text-center py-2 px-6 font-semibold font-dmSans text-sm'>{message}</p>
      </div>
    </div>
  )
}

export default LoadingPopUp