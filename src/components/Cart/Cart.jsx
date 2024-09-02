import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/Cart_context'
import { useQuery } from '@tanstack/react-query'
import { useEffect ,useState } from 'react'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Cart() {
  let {get_added_product}=useContext(CartContext)
  let {totalItems}=useContext(CartContext)
  const [products, setproducts] = useState([])
  const [totalPrice, settotalPrice] = useState(0)
 
 const[isLoading,setLoading]=useState(false);
const [Index, setIndex] = useState('initialState')
const [Remove_Loading, setRemove_Loading] = useState(false)


let header={token:localStorage.getItem('userToken')}
async function clear() {
  setLoading(true)
  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {headers:header}
  ).then(()=>{get_the_added();setLoading(false)})
}
async  function change_count(target,id,count,index) {
  setIndex(index)

  if( target.id=='plus'){count++}
  else if(target.id ='minus'){count--}
  
  
  setLoading(true)
  setRemove_Loading(false)
  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,

{count:count},
{headers:header}

 ).then((data)=>{
  setLoading(false)
  setRemove_Loading(true)
  })
 .catch(()=>{setLoading(false)})

 get_the_added()

}

  async function get_the_added() {
    
    let response =await get_added_product()
   
    console.log(response)
    setproducts(response.data.data.products)
    
    
    settotalPrice(response.data.data.totalCartPrice)
    
    
  
  }

  async function remove(id,index) {
    setLoading(true)
    setRemove_Loading(true)
    setIndex(index)
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:header
    }).then((response)=>{
      setLoading(false)
      setRemove_Loading(false)
      get_the_added()
      console.log(response.data.status)
    })
   

  }
useEffect(() => {
   get_the_added() 
  
  
}, [])



if(isLoading){
  return <Spinner/>
}
else{
  return(<>
  
  <div className='flex justify-center items-center  '>
        <div className='w-5/6 bg-gray-300 p-10 md:p-8'>
          <div className='flex justify-center items-center flex-wrap flex-col'>
            <div className='flex justify-between w-full'>
              <h1 className='text-4xl text-[#212529]'>cart shop</h1>
              <Link to={'/check'}><button className='px-8 py-4 bg-blue-600 rounded-xl'>check out</button></Link>
              
            </div>
            <div className='flex justify-between w-full'>
              <p className='text-[#212529] text-2xl'>total price <span className='text-green-700'>{totalPrice}</span></p>
              <p className='text-[#212529] text-2xl'>total number of items : <span className='text-green-700'>{totalItems}</span></p>
            </div>
          {products?.map((product,index)=>{
return(<>


<div className='w-full   md:flex md:justify-between md:items-center my-5'>
            <img src={product.product.imageCover} alt=""  className='w-full md:w-1/6'/>
            <div className='w-full md:w-5/6 flex justify-between items-center'>
            <div>
              <h1 className='md:text-3xl'>{product.product.title}</h1>
              <p><span>{product.price}</span> Eg</p>
              <div className='text-red-800 text-sm mt-4 cursor-pointer' onClick={()=>{remove(product.product.id,index)}}>
                {isLoading &&Index==index&&Remove_Loading?<div className='w-full h-1/2'><i className='fa fa-spinner fa-spin mx-3'></i></div>
                :
                <><i className="fa-solid fa-trash"></i><span>Remove</span></>
                }
                
                
                </div>
            </div>
            <div className='text-2xl flex justify-center items-center'>
            <i className="fa-solid fa-plus p-2 border-2 rounded-md border-green-600 cursor-pointer" id='plus' onClick={(event)=>{change_count(event.target,product.product.id,product.count,index)}}></i>
              {isLoading &&Index==index&&!Remove_Loading?
              <>
              <div className='w-full h-1/2'><i className='fa fa-spinner fa-spin mx-3'></i></div>
               </>:<p className='mx-3'>{ product.count}</p>}
              <i className="fa-solid fa-minus p-2 border-2 rounded-md border-green-600 cursor-pointer"  id='minus' onClick={(event)=>{change_count(event.target,product.product.id,product.count,index)}}></i>
            </div>
            </div>
          </div>



</>)
          })
        
          
          }
            <div className='pt-6 border-t-2 w-full text-center'>
              <button className='py-3 px-8  border-2 border-green-500 rounded-lg' onClick={()=>{clear()}}>clear your cart</button>
            </div>
          </div>
        </div>

      </div>
      
  </>)
}
  
  
}
