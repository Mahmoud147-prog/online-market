import axios from 'axios'
import React, { createContext, useContext } from 'react'
import { BaseURLcontext } from './BaseURLcontext'


export const productContext = createContext()
export default function Products_contextProvider(props) {

    const { bURL } = useContext(BaseURLcontext)
    async function get_products() {
        const { data } = await axios.get(`${bURL}api/v1/products`)
        return data
    }
    
    return (
        <>
        <productContext.Provider value={{get_products}}>
            {props.children}
        </productContext.Provider>
        </>
        
    )
}
