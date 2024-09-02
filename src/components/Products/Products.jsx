import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import {productContext} from '../../context/Products_context'
import styles from "../Products/Products.module.css"
import { Link, useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'


export default function Products() {
  
  const [text, settext] = useState('')
  // const [Res, setRes] = useState([])
  const input_ref=useRef(null)
  function handle_change(){
    if(input_ref.current){
      settext(input_ref.current.value)
    }
      else{console.log('nono')}
   }
   let {get_products}=useContext(productContext)
   let { data } = useQuery({
    queryKey: ['recentProd'],
    queryFn: fetchData_prod,
    refetchInterval: 5000,
  
    staleTime: 4000,
  
  })

  let headers={token:localStorage.getItem("userToken")}
  async function addProduct(id) {
    let response= await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
       {productId:id},
       {headers:headers}
  
    )
    console.log(id)
    
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
  
  
    }
   async function fetchData_prod() {
    const { data } = await get_products()
   //setRes(data)
   console.log(data)
   return data
  }
  //console.log(Res)
  

//  useEffect(() => {
//   fetchData_prod()
  
//  }, [Res])
if(data==null){return <Spinner/>}
else{return(<>

<div className='flex justify-center items-center my-24'>
        <input type="text" className='w-1/2 px-3 border-2 rounded-md outline-none ' placeholder='search...' ref={input_ref} onChange={handle_change} id='search_input' />
      </div>
      <div className='px-8 flex flex-wrap'>
        {text==''?   data?.map((productINfo)=>{
          return(<>
        
        <div className='w-full md:w-1/2 lg:w-1/4 p-5 overflow-hidden'>
          <div className={styles.hover_div} id='hover_div'>
            <Link to={`/productdetails/${productINfo._id}`}  >
            
            <img src={productINfo.imageCover} alt="" />
            </Link>
            
            <p className='text-green-800'> {productINfo.category.name
            }</p>
            <p className='mb-5'>{
              productINfo.title.split(' ')[0]
              }
              <span> </span> <span>{
                productINfo.title.split(' ')[1]
                }</span>
            </p>
            <div className='flex justify-between items-center'>
              <p>{productINfo.price}<span> EG</span></p>
              <i className="fa-solid fa-star text-yellow-400"><span className='text-black mx-2'>{productINfo.ratingsAverage}</span></i>
            </div>
            <div className='flex pe-3'>
              <i className="fa-solid fa-heart ms-auto text-4xl "></i>
            </div>
            <div className='flex justify-center items-center absolute w-full -bottom-40' id='moving_div'>
              <div className='border-0 rounded-md bg-green-700 text-center py-3 px-16 text-2xl cursor-pointer' onClick={()=>{addProduct(productINfo._id)}}>
                <i className="fa-solid fa-plus text-sm"></i>Add
              </div>
            </div>
          </div>
          
      
        </div>
       
          
          
          
          </>)
        })   :data?.map((productINfo)=>{
        if(productINfo.title.toLowerCase().includes(text.toLowerCase())){
          return(<>
          
        
        <div className='w-full md:w-1/2 lg:w-1/4 p-5 overflow-hidden'>
          <div className={styles.hover_div} id='hover_div'>
           <Link to={`productdetails/${productINfo._id}`}>
           <img src={productINfo.imageCover} alt="" /></Link>
            <p className='text-green-800'> {productINfo.category.name}</p>
            <p className='mb-5'>{
              productINfo.title.split(' ')[0]
              }
              <span> </span> <span>{
                productINfo.title.split(' ')[1]
                }</span>
            </p>
            <div className='flex justify-between items-center'>
              <p>{productINfo.price}<span> EG</span></p>
              <i className="fa-solid fa-star text-yellow-400"><span className='text-black mx-2'>{productINfo.ratingsAverage}</span></i>
            </div>
            <div className='flex pe-3'>
              <i className="fa-solid fa-heart ms-auto text-4xl "></i>
            </div>
            
            <div className='flex justify-center items-center absolute w-full   -bottom-40' id='moving_div'>
              <div className='border-0 rounded-md bg-green-700 text-center w-3/5 py-3 px-16 text-2xl'>
                <i className="fa-solid fa-plus text-sm"></i><div>Add</div>
              </div>
            </div>
          </div>
          
      
        </div> 
        
          </>)
        }})
        
        
        
        }
      
       
      </div>

</>)}
//  if(Res==[]){return (<>
//  <Spinner/>
//  </>)}
//  else{
//   return (
//     <>
//       <div className='flex justify-center items-center my-24'>
//         <input type="text" className='w-1/2 px-3 border-2 rounded-md outline-none ' placeholder='search...' ref={input_ref} onChange={handle_change} id='search_input' />
//       </div>
//       <div className='px-8 flex flex-wrap'>
//         {text==''?   Res?.map((productINfo)=>{
//           return(<>
        
//         <div className='w-full md:w-1/2 lg:w-1/4 p-5 overflow-hidden'>
//           <div className={styles.hover_div} id='hover_div'>
//             <Link to={`/productdetails/${productINfo._id}`}  >
            
//             <img src={productINfo.imageCover} alt="" />
//             </Link>
            
//             <p className='text-green-800'> {productINfo.category.name
//             }</p>
//             <p className='mb-5'>{
//               productINfo.title.split(' ')[0]
//               }
//               <span> </span> <span>{
//                 productINfo.title.split(' ')[1]
//                 }</span>
//             </p>
//             <div className='flex justify-between items-center'>
//               <p>{productINfo.price}<span> EG</span></p>
//               <i className="fa-solid fa-star text-yellow-400"><span className='text-black mx-2'>{productINfo.ratingsAverage}</span></i>
//             </div>
//             <div className='flex pe-3'>
//               <i className="fa-solid fa-heart ms-auto text-4xl "></i>
//             </div>
//             <div className='flex justify-center items-center absolute w-full -bottom-40' id='moving_div'>
//               <div className='border-0 rounded-md bg-green-700 text-center py-3 px-16 text-2xl'>
//                 <i className="fa-solid fa-plus text-sm"></i>Add
//               </div>
//             </div>
//           </div>
          
      
//         </div>
       
          
          
          
//           </>)
//         })   :Res?.map((productINfo)=>{
//         if(productINfo.title.toLowerCase().includes(text.toLowerCase())){
//           return(<>
          
        
//         <div className='w-full md:w-1/2 lg:w-1/4 p-5 overflow-hidden'>
//           <div className={styles.hover_div} id='hover_div'>
//            <Link to={`productdetails/${productINfo._id}`}>
//            <img src={productINfo.imageCover} alt="" /></Link>
//             <p className='text-green-800'> {productINfo.category.name}</p>
//             <p className='mb-5'>{
//               productINfo.title.split(' ')[0]
//               }
//               <span> </span> <span>{
//                 productINfo.title.split(' ')[1]
//                 }</span>
//             </p>
//             <div className='flex justify-between items-center'>
//               <p>{productINfo.price}<span> EG</span></p>
//               <i className="fa-solid fa-star text-yellow-400"><span className='text-black mx-2'>{productINfo.ratingsAverage}</span></i>
//             </div>
//             <div className='flex pe-3'>
//               <i className="fa-solid fa-heart ms-auto text-4xl "></i>
//             </div>
            
//             <div className='flex justify-center items-center absolute w-full   -bottom-40' id='moving_div'>
//               <div className='border-0 rounded-md bg-green-700 text-center w-3/5 py-3 px-16 text-2xl'>
//                 <i className="fa-solid fa-plus text-sm"></i><div>Add</div>
//               </div>
//             </div>
//           </div>
          
      
//         </div> 
        
//           </>)
//         }})
        
        
        
//         }
      
       
//       </div>

//     </>
//   )
//  }
 
}
