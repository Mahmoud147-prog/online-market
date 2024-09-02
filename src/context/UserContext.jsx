import React from 'react'
import { createContext } from 'react'
import { useState , useEffect } from 'react'


export let User_Context=createContext()
export default function UserContext(props) {

    const [LogIn, setLogIn] = useState(null)
    
    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
          setLogIn(localStorage.getItem("userToken"));
        }
      }, []);
  return (
   <>
   <User_Context.Provider value={{LogIn,setLogIn}}>
{props.children}
   </User_Context.Provider>
   
   </>
  )
}
