import React, { createContext, useContext ,useState} from 'react'
import axios from "axios";
import { BaseURLcontext } from './BaseURLcontext';
import { useQuery } from '@tanstack/react-query';

export let Cat_context=createContext()

export default function Cat_contextProvider(props) {
     let {bURL}=useContext(BaseURLcontext)
      
   
    async function get_cat() {
      try {
        const {data} = await axios.get(`${bURL}api/v1/categories`);
        
        return data;
      } catch (error) {
        return { error: "Failed to fetch categories" };
      }
      
    }
    


  return (
    <>
    <Cat_context.Provider value={{get_cat}} >
    {props.children}
    </Cat_context.Provider>
    
    </>
  )
}
