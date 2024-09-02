import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'

import Home from './components/Home/Home';
import Cart from './components/cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BaseURLProvider from './context/BaseURLcontext';
import Cat_contextProvider from './context/Cat_context';
import Products_contextProvider from './context/Products_context';
import SingleProduct from './components/single_product/single_product';
import { Toaster } from 'react-hot-toast';
import UserContext from './context/UserContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Cart_context from './context/Cart_context';
import Check from './components/Check/Check';
import WhishList_Context from './context/WhishList_Context';
import EmailEntery from './components/Email_Entery/Email_Entery';
import Coding from './components/Coding/Coding';

import ResetPasswrd from './components/Reset_passwrd/Reset_passwrd';
let query =new QueryClient()

let routes=createBrowserRouter([
  {
    path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'productdetails/:id',element:<ProtectedRoute><SingleProduct/></ProtectedRoute>},
      {path:'login',element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'check',element:<ProtectedRoute><Check/></ProtectedRoute>},
      {path:'email_entery',element:<EmailEntery/>},
      {path:'coding',element:<Coding/>},
      {path:'Reset',element:<ResetPasswrd/>},
      
      {path:'*',element:<NotFound/>}
    ]
  }
])



function App() {
  

  return (
    <>
   
    
    <Cart_context>
    <WhishList_Context>
    <UserContext>
    <BaseURLProvider>
  <Products_contextProvider>
  <Cat_contextProvider>
    
    <QueryClientProvider client={query}>
    <RouterProvider router={routes}></RouterProvider>
    <Toaster/>
    </QueryClientProvider>
    
    
    </Cat_contextProvider>
  </Products_contextProvider>
    </BaseURLProvider>
    </UserContext>
    </WhishList_Context>
    </Cart_context>
    

    
    
    
    
    
    
     
    </>
  )
}

export default App
