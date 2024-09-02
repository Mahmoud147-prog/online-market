import React from 'react'
import { createContext ,useState} from 'react'
import axios from 'axios'


export let CartContext=createContext()




export default function Cart_context(props) {
    const [totalItems, settotalItems] = useState(0)
    const [cartId, setcartId] = useState('initialState')
    
    
    let header={
        token:localStorage.getItem('userToken')
      }
      async function get_added_product() {
        let response= await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
          {headers:header}
        )
        setcartId(response.data.cartId)
        settotalItems(response.data.numOfCartItems)
        return response
      }  




  return (
    <>
    <CartContext.Provider value={{get_added_product,totalItems,cartId}}>
{props.children}
    </CartContext.Provider>
    
    </>
  )
}
