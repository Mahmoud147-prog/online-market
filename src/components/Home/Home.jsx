import React, { useContext, useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.module.css';
import styles from './Home.module.css';
import { BaseURLcontext } from '../../context/BaseURLcontext';
import axios from 'axios';
import { Cat_context } from './../../context/Cat_context';
import { useQuery } from '@tanstack/react-query';
import { productContext } from '../../context/Products_context';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { User_Context } from '../../context/UserContext';
import { CartContext } from '../../context/Cart_context';
import toast from 'react-hot-toast'
import { whishlist_Cont } from '../../context/WhishList_Context';

export default function Home() {



let{get_added_product}=useContext(CartContext)
  let {add_to_whishList}=useContext(whishlist_Cont)

//styling the heart icon on refresh
const [whishList, setwhishList] = useState(['initialState'])
let{get_the_added}=useContext(whishlist_Cont)
async function get_whishList() {
  let response =await get_the_added()
  setwhishList(response.data.data)
  console.log(response.data.data)
}


//styling the heart icon onclick
function red_styling(target){
target.classList.add('text-red-500')
}
  //adding products to whishList
  async function adding_to_whishList(id) {
    let response=await add_to_whishList(id)

    console.log(response.data.status)

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
  //adding products to cart
  let headers = {
    token:localStorage.getItem('userToken')
    }
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
  get_added_product()

  }
  //query statetemnt
  const fetchMultipleData = async () => {
    const [products, categories] = await Promise.all([fetchData_prod(), fetchData_cat()]);
    return { products, categories };
  };
  let { data } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: fetchMultipleData,
    refetchInterval: 5000,

    staleTime: 4000,

  })
//context usage

  let { bURL } = useContext(BaseURLcontext);
let {get_products}=useContext(productContext)
  let { get_cat } = useContext(Cat_context)
// data fetching function
  async function fetchData_cat() {
    const { data } = await get_cat()
    console.log(data)
    return data
  }
  async function fetchData_prod() {
    const { data } = await get_products()
    console.log(data)
    return data
  }
// input handling
const [text, settext] = useState('')
 
   const input_ref=useRef(null)
   function handle_change(){
    if(input_ref.current){
      settext(input_ref.current.value)
    }
      else{console.log('nono')}
   }
   

  // useEffect to fetch data and log it
  useEffect(() => {
    // fetchData(); // Call the function
    get_whishList()
 

  }, [bURL]); // Dependency array to re-fetch if bURL changes

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  var settings_2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

if(data==null){
  return <Spinner/>
}
else{
  return (
    <>
    
      <div className='w-full flex justify-center items-center pt-5'>
        <div className='w-1/2 flex'>
          <div className='w-1/2'>
            <Slider {...settings}>
              <div >
                <img src="./src/assets/chair.jpg" alt="" className='w-full ' />
              </div>
              <div>
                <img src="./src/assets/bag.jpg" alt="" className='w-full' />
              </div>
              <div>
                <img src="./src/assets/rings.jpg" alt="" className='w-full' />
              </div>
            </Slider>
          </div>
          <div className="photos w-1/2">
            <img src="./src/assets/multiple_bags.jpg" alt="" className='w-full' />
            <img src="./src/assets/gittar.jpg" alt="" className='w-full' />
          </div>
        </div>
      </div>
      <div className='w-full my-8' id='second_carousel'>
        <Slider {...settings_2}>

          {data?.categories?.map((productINfo) => {
            return <>
              <div>
                <img src={productINfo.image} alt="" className='h-64 w-full object-cover ' />
                <p className='font-[500] text-2xl'>{productINfo.name}</p>
              </div>

            </>
          })}
        </Slider>

      </div>
      <div className='flex justify-center items-center my-24'>
        <input type="text" className='w-1/2 px-3 border-2 rounded-md outline-none ' placeholder='search...' ref={input_ref}  onChange={handle_change}       id='search_input' />
      </div>
      <div className='px-8 flex flex-wrap'>
        {text==''?   data?.products?.map((productINfo,index)=>{
          for(let i=0;i<whishList.length;i++){
            if(productINfo._id==whishList[i]._id){
              document.querySelectorAll('.fa-heart')[index]?.classList.add('text-red-500')
            }
          }
          
          
          return(<>
        
        <div className='w-full md:w-1/2 lg:w-1/4 p-5 overflow-hidden'>
          <div className={styles.hover_div} id='hover_div'>
            <Link to={`productdetails/${productINfo._id}`}>
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
              <i className="fa-solid fa-heart ms-auto text-4xl  cursor-pointer" onClick={(event)=>{adding_to_whishList(productINfo._id,index);red_styling(event.target)}}></i>
            </div>
            <div className='flex justify-center items-center absolute w-full -bottom-40' id='moving_div'>
              <div className='border-0 rounded-md bg-green-700 text-center py-3 px-16 text-2xl cursor-pointer' onClick={()=>{addProduct(productINfo._id)}}>
                <i className="fa-solid fa-plus text-sm"></i>Add
              </div>
            </div>
          </div>
          
      
        </div>
       
          
          
          
          </>)
        })   :data?.products?.map((productINfo)=>{
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
              <i className="fa-solid fa-heart ms-auto text-4xl "  onClick={(event)=>{adding_to_whishList(productINfo._id,index);red_styling(event.target)}} ></i>
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
    </>
  );
}
  
}