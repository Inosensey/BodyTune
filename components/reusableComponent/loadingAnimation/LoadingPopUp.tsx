"use client"

import React from 'react'
import { ProgressBar } from 'react-loader-spinner'

interface props {
  message: string
  isLoading: boolean
}

const LoadingPopUp = ({message, isLoading}:props) => {
  return (
    <div className={`${isLoading ? "fixed" : "hidden"} top-0 left-0 z-[100] bg-black/[0.5] w-screen h-screen flex justify-center items-center`}>
      <div className='bg-primary flex flex-col items-center justify-center rounded-lg min-w-[300px] max-w-[450px] phone:w-11/12 laptop:w-9/12'>
        <ProgressBar
          visible={true}
          height="60"
          width="60"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          barColor="#D3F0D1"
          borderColor="#4B6F64"
          wrapperClass=""
        />
        <p className='text-center py-2 px-6 font-semibold font-dmSans text-sm'>{message}</p>
      </div>
    </div>
  )
}

export default LoadingPopUp