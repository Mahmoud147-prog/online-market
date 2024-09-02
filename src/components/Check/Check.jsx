import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { User_Context } from '../../context/UserContext';

import { CartContext } from './../../context/Cart_context';
export default function Check() {


  let {setLogIn}=useContext(User_Context)
  const[apiError,setError]=useState('');
  const[isLoading,setLoading]=useState(false);
  let navigate =useNavigate();
const [id, setid] = useState('initialState')
let {cartId,get_added_product}=useContext(CartContext)




let header={token:localStorage.getItem('userToken')}
 async function handleRegister(formsData){
  setLoading(true)
  get_added_product()
  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,formsData,
    {headers:header}
  )
  .then((response)=>{
   setLoading(false)
   
 })
 .catch((error)=>{setLoading(false);console.log(error)})
  
  }
  let validationSchema = Yup.object({
    details:Yup.string().required('details is required').min(10,'min length is 10').max(50,'max length is 50'),
    phone:Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/,'enter avalid phone'),
    city:Yup.string().required('city is required').min(2,'min length is 2').max(15,'maximum is 15 words'),
   
    })
    let formik =useFormik({
      initialValues:{
      details:'',
      phone:'',
      city:''
      },
      // validate:myValidation
      validationSchema:validationSchema
      ,
      onSubmit:handleRegister
      })
      













  return (
    <>
     <div className='px-28 '>
    <div className=" shadow-md rounded-md p-6">
          
           
            {apiError?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{apiError}</span>
                   </div>:null
                    }
            <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">details</label>
                    <div className="mt-1">
                        <input id="details" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} name='details' type="text" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                    {formik.errors.details && formik.touched.details?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.details}</span>
                   </div>:null
                    }
                   
                    
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">phone</label>
                    <div className="mt-1">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='phone' value={formik.values.phone} name='phone' type="tel" autoComplete="tel" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                     {formik.errors.phone && formik.touched.phone ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.phone}</span>
                   </div>:null
                    }
                    </div>
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">city</label>
                    <div className="mt-1">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='city' value={formik.values.city}  name='city' type="text" autoComplete="address-level1" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                    {formik.errors.city && formik.touched.city ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.city}</span>
                   </div>:null
                    }
                    </div>
                </div>

                
                <div className='flex '>
                    <button type="submit"  disabled={!(formik.isValid && formik.dirty)}
                        className="flex w-full  justify-center rounded-md   text-[#427fbb] border-2 border-[#427fbb]  py-2 px-4 text-sm font-medium  shadow-sm hover:bg-[#427fbb] hover:text-black focus:outline-none cursor-pointer  " >  
                        {isLoading?<i className='fa fa-spinner fa-spin mx-3'></i>:null}    
                        Pay Now
                        </button>
                </div>
            </form>
        </div>
    </div>
    
    </>
  )
}
