import React from 'react'
import { Audio } from 'react-loader-spinner'
export default function Spinner() {
  return (
    <>
    <div className='flex h-screen justify-center bg-[rgba(0,0,0,0.5)] items-center'>
    <Audio
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
  />
    </div>
   
    </>
  )
}
