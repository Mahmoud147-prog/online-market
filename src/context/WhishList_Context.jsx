import axios from 'axios'
import React, { createContext } from 'react'



export let  whishlist_Cont=createContext()
export default function WhishList_Context(props) {
  let header={token:localStorage.getItem("userToken")}
async function add_to_whishList(id) {
 
  let response=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`
    ,{
"productId": id
    }
    ,{headers:header}
  )
  return response
}
async function get_the_added() {
  let response =await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {headers:header}
  )
  return response
}
async function remove_from_whishList(id) {
 let response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
    headers:header
  })
  return response
}
  return (<>
  
  <whishlist_Cont.Provider value={{add_to_whishList,get_the_added,remove_from_whishList}}>
      {props.children}
    </whishlist_Cont.Provider>
  </>)
 
}
