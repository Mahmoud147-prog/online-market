import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'



export   let BaseURLcontext=createContext()


export default function BaseURLProvider(props) {
     
    let [bURL, setbURL] = useState('https://ecommerce.routemisr.com/')
  return (
    <>
    <BaseURLcontext.Provider value={{bURL,setbURL}}>
    {props.children}
    </BaseURLcontext.Provider>
    
    </>
  )
}
