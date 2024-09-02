import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { BaseURLcontext } from '../../context/BaseURLcontext'
import { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import style from '../Brands/Brands.module.css'
import '../Brands/Brands.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
export default function Brands() {
let {bURL}=useContext(BaseURLcontext)


  const [res, setres] = useState([])
  const [GlobalIndex, setGlobalIndex] = useState(null)

  let { data } = useQuery({
    queryKey: ['recentBrand'],
    queryFn: get_brands,
    refetchInterval: 5000,
  
    staleTime: 4000,
  
  })

 async function get_brands(){
 let {data}= await axios.get(`${bURL}api/v1/brands`)
 return data.data
  // setres(data)
  
  // return data
 }
 function x(id){
  toast.dismiss(id)
  let ele =document.querySelector('#the_hidden_div');
  ele.classList.add('hidden')
  document.body.style.overflow='auto'
 }
 const [Id, setId] = useState(0)
 function notify(index){
  toast(
 
    (t)=>(<>
    
    {
     data!=null&& index!=null? <div className='w-full'>
     <div className='flex justify-end items-center cursor-pointer' onClick={hide}><i className="fa-solid fa-square-xmark"></i></div>
     <div className='border-y-4 flex justify-between items-center'>
      <div className='w-1/2'>
        <div className='py-5'>
        <h1 className='text-green-600 text-3xl'>{data[index].name}</h1>
        <p>{data[index].name}</p>
    
        </div>
      </div>
      <div className='w-1/2'><img src={data[index].image} alt="" className='h-full w-full object-cover' id='my_img'/></div>
     </div>
     <div className='flex py-3'><button className='px-6 py-3 bg-gray-700 border rounded-md ms-auto text-white' onClick={hide}>close</button></div>
     </div>:<Spinner/>
    }
    
    
    </>)
    
    
    ,{
     position: 'top-center',
     duration:Infinity,
    className:'w-1/3'
     
   
    });
 } 

 function show_opacity(){
  let ele =document.querySelector('#the_hidden_div')
  ele.classList.remove('hidden')
  document.body.style.overflow='hidden'
}
function hide(){
  let ele =document.querySelector('#the_hidden_div');
  ele.classList.add('hidden')
  document.body.style.overflow='auto'
  x(Id)
}

 //console.log(GlobalIndex)
//  useEffect(() => {
//  get_brands()


//  }, [bURL])

if(data==null){return <Spinner/>}
else{return(<>
<h1 className='text-center text-6xl text-green-700'>All Brands</h1>
  <div className='flex justify-center items-center px-7'>
  <div className='w-full flex flex-wrap justify-center items-center'>
   {data.map((ele,index)=>{
  
     return(<>
     
     <div className='w-full sm:w-1/2 md:w-1/4 p-9' >
     <div className={style.shadow_div} onClick={()=>{ notify(index) ;show_opacity()}} >
     <img src={ele.image} alt="" />
     <p className='text-center mb-8'>{ele.name}</p>
     </div>
     
     </div>
     </>)
   })}
  </div>
  </div>
  <div className=' w-full h-full  bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 bottom-0 right-0 z-50  hidden' id='the_hidden_div'
  onClick={()=>{hide()}} ></div>


</>)}






//  if(res!=[]){return (
//   <>
//   <h1 className='text-center text-6xl text-green-700'>All Brands</h1>
//   <div className='flex justify-center items-center px-7'>
//   <div className='w-full flex flex-wrap justify-center items-center'>
//    {res.map((ele,index)=>{
  
//      return(<>
     
//      <div className='w-full sm:w-1/2 md:w-1/4 p-9' >
//      <div className={style.shadow_div} onClick={()=>{ notify(index) ;show_opacity()}} >
//      <img src={ele.image} alt="" />
//      <p className='text-center mb-8'>{ele.name}</p>
//      </div>
     
//      </div>
//      </>)
//    })}
//   </div>
//   </div>
//   <div className=' w-full h-full  bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 bottom-0 right-0 z-50  hidden' id='the_hidden_div'
//   onClick={()=>{hide()}} ></div>
//   </>
//  )}
//  else{ return(<>
//  <Spinner/>
 
//  </>)}
  
}
