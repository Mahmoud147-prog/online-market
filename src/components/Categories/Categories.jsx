import React, { useContext } from 'react'
import { BaseURLcontext } from '../../context/BaseURLcontext'
import { Cat_context } from '../../context/Cat_context'
import { useState } from 'react'
import { useEffect } from 'react'
import style from '../Categories/Categories.module.css'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'




export default function Categories() {
const [Res, setRes] = useState([])
const [Sub_Res, setSub_Res] = useState([])
const [Cat_Name, setCat_Name] = useState(null)



let {get_cat}=useContext(Cat_context)



let { data } = useQuery({
  queryKey: ['recentCat'],
  queryFn: get_categories,
  refetchInterval: 5000,

  staleTime: 4000,

})
async function get_categories(){
let {data}=await get_cat()
console.log(data)
return data
}
async function get_sub_cat(id){
  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`).then((data)=>{setSub_Res(data.data.data)
    ;console.log(Sub_Res)
  })
  
  
}
function handleClick(id,name){
  get_sub_cat(id);
  setCat_Name(name)
  document.querySelector('#h_div').classList.remove('hidden')

}



console.log(Res)

// useEffect(() => {
// get_categories()
// }, [])



if(data==null){
  return <Spinner/>
}
else{return (<>
     <div className='flex flex-wrap justify-start items-center'>
       {
        data?.map((category)=>{
         return(<>
          <div className='w-full md:w-1/3 p-3  ' onClick={()=>{handleClick(category._id,category.name)}}>
          <div className={`flex flex-col justify-center items-center w-full h-96 border-2 rounded-md overflow-hidden ${style.hover_div}`}>
        
          <img src={category.image} className='w-full h-5/6 object-cover '></img>
          <h1 className='text-center text-green-900 text-3xl py-5'>{category.name}</h1>
        
          </div>
          
          </div>
         
         </>)
        })
      }
    </div>
    
    
    <div>
    <h1 className='text-green-500 text-center text-4xl hidden' id='h_div'><span>{Cat_Name?Cat_Name:null}</span> subcategories</h1>
    <div className='flex flex-wrap justify-start items-center'>
    {
      Sub_Res?.map((Sub_Cat)=>{
        return(<>
        
        <div className='w-1/3 p-3  '>
          <div className='border-2'>
         <h1 className='text-center font-bold text-3xl py-5'>{Sub_Cat.name}</h1>
         </div>
          
          </div>
        </>)
      })
    }
    </div>
    </div>
    
    
 





</>)}

// if(Res==[]){
//   return(<>
//   <Spinner/>
//   </>)
// }
// else{
//   return (
//     <>
//     <div className='flex flex-wrap justify-start items-center'>

//       {
//         Res?.map((category)=>{
//          return(<>
//           <div className='w-1/3 p-3  ' onClick={()=>{handleClick(category._id,category.name)}}>
//           <div className={`flex flex-col justify-center items-center w-full h-96 border-2 rounded-md overflow-hidden ${style.hover_div}`}>
        
//           <img src={category.image} className='w-full h-5/6 object-cover '></img>
//           <h1 className='text-center text-green-900 text-3xl py-5'>{category.name}</h1>
        
//           </div>
          
//           </div>
         
//          </>)
//         })
//       }
//     </div>
    
    
//     <div>
//     <h1 className='text-green-500 text-center text-4xl hidden' id='h_div'><span>{Cat_Name?Cat_Name:null}</span> subcategories</h1>
//     <div className='flex flex-wrap justify-start items-center'>
//     {
//       Sub_Res?.map((Sub_Cat)=>{
//         return(<>
        
//         <div className='w-1/3 p-3  '>
//           <div className='border-2'>
//          <h1 className='text-center font-bold text-3xl py-5'>{Sub_Cat.name}</h1>
//          </div>
          
//           </div>
//         </>)
//       })
//     }
//     </div>
//     </div>
    
    
 
    
//     </>
//   )
// }
 
}
