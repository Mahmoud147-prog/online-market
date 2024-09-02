import React from 'react'
import { useContext } from 'react'

import { useEffect ,useState } from 'react'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { whishlist_Cont } from '../../context/WhishList_Context'
import toast from 'react-hot-toast'
import { CartContext } from './../../context/Cart_context';

export default function Wishlist() {
 
  let {get_the_added,remove_from_whishList}=useContext(whishlist_Cont)
  const [products, setproducts] = useState([])

 
 const[isLoading,setLoading]=useState(false);
const [Index, setIndex] = useState('initialState')
const [Remove_Loading, setRemove_Loading] = useState(false)
let{get_added_product}=useContext(CartContext)

let header={token:localStorage.getItem('userToken')}
//adding to cart
async function addProduct(id) {
  let response= await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
     {productId:id},
     {headers:header}

  )
  
  
  if(response.data.status == 'success'){
    toast.custom((<>
    <div className='bg-green-500 py-4 px-8 text-white rounded-xl'><span><i className="fa-solid fa-check  me-2"></i></span>{response.data.message}</div>
    
    
    </>)
      ,{
      duration: 4000,
      position: 'top-right',
      
      
    });
  }else{
    toast.error(response.data.message,{
      duration: 4000,
      position: 'top-right',
    });
  }
  get_added_product()

  }

async function remove(id,index){
  setLoading(true)
  setIndex(index)
  let response= await remove_from_whishList(id)
  if(response){setLoading(false)
    get_the_added_toWhishList()
  }
  console.log(response)
}

  async function get_the_added_toWhishList() {
    let response =await get_the_added()
    setproducts(response.data.data)
  }

 
useEffect(() => {
  get_the_added_toWhishList() 
  
  
}, [])



  if(isLoading){
    return <Spinner/>
  }
  else{
    return(<>
    
    <div className='flex justify-center items-center  '>
          <div className='w-5/6 bg-gray-300 p-10 md:p-8'>
            <div className='flex justify-center items-center flex-wrap flex-col'>
              <div className='flex justify-start w-full'>
                <h1 className='text-4xl text-[#212529]'>My whishlist</h1>
                
                
              </div>
          
            {products?.map((product,index)=>{
  return(<>
  
  
  <div className='w-full   md:flex md:justify-between md:items-center my-5'>
              <img src={product.imageCover} alt=""  className='w-full md:w-1/6'/>
              <div className='w-full md:w-5/6 flex justify-between items-center'>
              <div>
                <h1 className='md:text-3xl'>{product.title}</h1>
                <p><span>{product.price}</span> Eg</p>
                <div className='text-red-800 text-sm mt-4 cursor-pointer' onClick={()=>{remove(product.id,index)}}>
                  {isLoading &&Index==index&&Remove_Loading?<div className='w-full h-1/2'><i className='fa fa-spinner fa-spin mx-3'></i></div>
                  :
                  <><i className="fa-solid fa-trash"></i><span>Remove</span></>
                  }
                  
                  
                  </div>
              </div>
              <div className='text-2xl flex justify-center items-center'>
             <button className='py-3 px-9 border-2 border-green-600 rounded-lg' onClick={()=>{addProduct(product.id)}}>
              Add to cart
             </button>
              </div>
              </div>
            </div>
  
  
  
  </>)
            })
          
            
            }
              
            </div>
          </div>
  
        </div>
        
    </>)
  }
}
