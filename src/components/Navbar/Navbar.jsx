import React, { createContext, useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import Login from './../Login/Login';
import { User_Context } from '../../context/UserContext';
import { CartContext } from '../../context/Cart_context';

export default function Navbar() {
  let {LogIn,setLogIn}=useContext(User_Context)
  let navigate=useNavigate()
  let {totalItems}=useContext(CartContext)
  let {get_added_product}=useContext(CartContext)
  async function get_the_added() {
    
    let response =await get_added_product() 
    
    console.log(response.data.numOfCartItems)
  }
  function toggle_exposure() {
    let toggled_ele = document.querySelector('#navbar-sticky');

    toggled_ele.classList.toggle('hidden')
  }

function logout(){
  //formsData('userToken');
  setLogIn(null);
  navigate('/login');
  localStorage.removeItem('userToken')
}

useEffect(() => {
  if(localStorage.getItem('userToken')!=null){
    
    get_the_added()
  }
  const storedUser = localStorage.getItem('userToken');
  if (storedUser) {
    // Parse the user data and set it in your state
    setLogIn(storedUser);
  } else {
    // Reset state if no user is found
    setLogIn(null);
  }

}, [])


if(!LogIn){
  return(<>
  

  <nav className="bg-[#F8F9FA] dark:bg-gray-900 fixed w-full z-20 top-0 start-0  dark:border-gray-600 " >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
          <div  className="flex items-center cursor-pointer " >
            <i className="fa-solid fa-cart-shopping text-green-700 text-4xl"></i>
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">fresh cart</span>
          </div>
          

          
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
             
              <li>
               
                <NavLink  to={'login'}className="block  px-3 text-gray-900 rounded   md:px-3 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Log in </NavLink>
              </li>
              <li>
                
                <NavLink className="block  px-3 text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" to={'Register'}>Register</NavLink>
              </li>
             
            </ul>
          </div>
            <button onClick={toggle_exposure} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          
        </div>
      </nav>
  </>)
}
else {return (<>


<nav className="bg-[#F8F9FA] dark:bg-gray-900 fixed w-full z-20 top-0 start-0  dark:border-gray-600 " >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to={''}> 
          <div  className="flex items-center cursor-pointer " >
            <i className="fa-solid fa-cart-shopping text-green-700 text-4xl"></i>
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">fresh cart</span>
          </div>
          </NavLink>

          
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div  className="flex items-center ">
              <Link to={'/cart'}><i className="fa-solid fa-cart-shopping text-gray-600 text-2xl me-6 relative">
              <span className="absolute -top-4 -right-4 bg-green-800 text-white text-xs font-medium me-2 py-1 px-2 rounded dark:bg-blue-900 dark:text-blue-300">{totalItems}</span>
              </i></Link>
              
              

              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer" onClick={()=>{logout()}} >log out</span>
            </div>
            <button onClick={toggle_exposure} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>

                <NavLink className="block  px-3  rounded   " to={''}>  Home</NavLink>
              </li>
              <li>
               
                <NavLink  to={'cart'}className="block  px-3 text-gray-900 rounded   md:px-3 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >cart </NavLink>
              </li>
              <li>
                
                <NavLink className="block  px-3 text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" to={'wishlist'}>wishlist</NavLink>
              </li>
              <li>
                
                <NavLink to={'products'} className="block  px-3 text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">products</NavLink>
              </li>
              <li>
                
                <NavLink to={'categories'} className="block  px-3 text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">categories</NavLink>
              </li>
              <li>
                
                <NavLink to={'brands'} className="block  px-3 text-gray-900 rounded    md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">brands</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

</>)}
  
}
