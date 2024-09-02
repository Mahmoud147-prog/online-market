import React, { useEffect } from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
 
  

  useEffect(() => {
    const h=document.querySelector('nav').offsetHeight
  document.querySelector('#upper_div').style=`height:${h}px`
  
  }, [])
 
  return (
    <>
    <div id='upper_div' className='w-full  '></div>
    <Navbar/>
    <Outlet></Outlet>
    
    
    </>
  )
}
