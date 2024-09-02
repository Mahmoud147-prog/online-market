import React, { useContext } from 'react'
import { useState ,useEffect } from 'react'
import { useRef } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from '../Email_Entery/Email_Entery.module.css'
import { User_Context } from '../../context/UserContext'
export default function ResetPasswrd() {

//api part of code
let {LogIn,setLogIn}=useContext(User_Context)
const[apiError,setError]=useState('');
const[isLoading,setLoading]=useState(false);
let navigate =useNavigate();

function handle_reset(formsData){
setLoading(true)
axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,formsData)
.then((response)=>{console.log('success',response)
if(response.
  statusText
  

  == 'OK'){
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formsData)
    localStorage.setItem('userToken',response?.data?.token)
    setLogIn(response?.data?.token)
    setLoading(false)
    navigate('/')
}
})
.catch((error)=>{
setLoading(false)
setError(error.response.data.message
)
console.log(error)
})

}

let validationSchema = Yup.object({
  email:Yup.string().required('email is required').email('enter avalid email'),
  newPassword:Yup.string().required('please enter a new password').matches(/^[A-Z][a-z0-9]{6,8}$/,'password not valid')
  
})


let formik =useFormik({
initialValues:{
  email:'',
  newPassword:''

},
validationSchema:validationSchema
,
onSubmit:handle_reset
})


//adding shadow by js

const [my_boxShadow, setmy_boxShadow] = useState('initialState')
const boxRef = useRef(null)
function add_shadow() {
  setmy_boxShadow('0px 0px 10px blue')
}
const handleClickOutside = (event) => {

  if ( !boxRef.current.contains(event.target)) {
    setmy_boxShadow(''); 
  }
};
useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);




  return (
   <>
    <div className='flex justify-center items-center'>
   <div className='w-4/5'>
   {apiError?
                      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{apiError}</span>
                    </div>:null
                     }
  
 <form className="w-full" onSubmit={formik.handleSubmit} formMethod='POST'>
 <h1 className='text-4xl'>please enter your email</h1>
   <div className="relative z-0 w-full mb-5 group mt-5 border-2 rounded-md  "
   ref={boxRef} style={{boxShadow:my_boxShadow}} onClick={()=>{add_shadow()}}>
     
     <input onChange={formik.handleChange} value={formik.values.email}  onBlur={formik.handleBlur }   name='email'   id="email" className={`${style.input} peer`} placeholder=" " required />
     <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">email</label>
   </div>
   {formik.errors.email && formik.touched.email ?
                      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{formik.errors.email}</span>
                    </div>:null
                     }

   <h1 className='text-4xl'>please enter your new password</h1>
   <div className="relative z-0 w-full mb-5 group mt-5 border-2 rounded-md  "
   ref={boxRef} style={{boxShadow:my_boxShadow}} onClick={()=>{add_shadow()}}>
     
     <input onChange={formik.handleChange} value={formik.values.newPassword}  onBlur={formik.handleBlur } type='password'  name='newPassword'   id="newPassword" className={`${style.input} peer`} placeholder=" " required />
     <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">password</label>
   </div>
   {formik.errors.newPassword && formik.touched.newPassword ?
                      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{formik.errors.newPassword}</span>
                    </div>:null
                     }
  
   <button type="submit" className="text-green-700 hover:text-white border-2 border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
   disabled={!(formik.isValid && formik.dirty)} 
   >{isLoading?<i className='fa fa-spinner fa-spin mx-3'></i>:null}verify</button>
 </form>
   
   </div>
 </div>
   </>
  )
}
