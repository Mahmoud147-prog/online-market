import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { User_Context } from '../../context/UserContext';

export default function Login() {

  let {setLogIn} =useContext(User_Context)
  const[apiError,setError]=useState('');
  const[isLoading,setLoading]=useState(false);
  let navigate =useNavigate();
  function handleLogin(formsData){
  setLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formsData)
  .then((response)=>{console.log('success',response)
  if(response.data.message == 'success'){
      localStorage.setItem('userToken',response?.data?.token)
      setLogIn(response?.data?.token)
      setLoading(false)
      navigate('/')
  }
  })
  .catch((error)=>{
  setLoading(false)
  setError(error.response.data.message)
  })
  
  }
  
  let validationSchema = Yup.object({
  email:Yup.string().required('email is required').email('enter avalid email'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'password not valid'),
  })
  
  
  let formik =useFormik({
  initialValues:{
  email:'',
  password:'',
  },
  validationSchema:validationSchema
  ,
  onSubmit:handleLogin
  })
  

  
  return (
    <>
     <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="w-5/6 space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3  text-3xl font-bold tracking-tight ">
               Login Now
            </h2>
           
            {apiError?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{apiError}</span>
                   </div>:null
                    }
            <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
                <div>
                    <label htmlFor="ur-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='ur-email' value={formik.values.email} name='email' type="email" autocomplete="email-address" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                     {formik.errors.email && formik.touched.email ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.email}</span>
                   </div>:null
                    }
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='password' value={formik.values.password}  name='password' type="password" autocomplete="password" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                    {formik.errors.password && formik.touched.password ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.password}</span>
                   </div>:null
                    }
                    </div>
                </div>

                <div className='flex justify-between'>
                    <Link className='text-2xl hover:text-green-700 transition-colors cursor-pointer ' to={'/email_entery'}> <h1 >forgot your password ?</h1></Link>
               
                    <button type="submit"  disabled={!(formik.isValid && formik.dirty)}
                        className="w-1/6  flex px-8 justify-center rounded-md border border-transparent bg-green-800 hover:bg-green-900 py-2  text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">  
                        {isLoading?<i className='fa fa-spinner fa-spin mx-3'></i>:null}    
                        Login Now
                        </button>
                </div>
            </form>
            
        </div>
    </div>
</div>
    
    </>
  )
}
