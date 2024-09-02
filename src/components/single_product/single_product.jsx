import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BaseURLcontext } from '../../context/BaseURLcontext'
import axios from 'axios'
import { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from '../Spinner/Spinner'
import toast from 'react-hot-toast'

export default function SingleProduct() {
  let { id } = useParams()
  const [details, setdetails] = useState(null)
  let { bURL } = useContext(BaseURLcontext)
  let headers={token:localStorage.getItem('userToken')}
  async function get_product_details() {
    await axios.get(`${bURL}api/v1/products/${id}`).then(({ data }) => {
      setdetails(data.data);
console.log(data.data)
    })

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
  
  
    }


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  useEffect(() => {
    get_product_details()

  }, [id, bURL])


  if(details==null){
    return <Spinner/>
  }
  else{
    return (<>
      <div className=' px-24 flex flex-wrap my-3 '>
        <div className=' w-1/3 '>
          <Slider {...settings} >
  
            {
              details?.images?.map((image) => {
                return (<>
                  <div >
                    <img src={image} alt="" className='w-full  h-[500px] object-cover' />
                  </div>
  
                </>)
              })
            }
          </Slider>
        </div>
        <div className='flex justify-center items-center w-2/3'>
        <div className=' w-5/6 '>
          <h1 className='text-4xl '>{details?.title}</h1>
          <p className='mb-5  '>{details?.category.name}</p>
          <div className='flex items-center justify-between'>
            <p className=''>{details?.price} EGp</p>
            <i className="fa-solid fa-star text-yellow-500"><span>{details?.ratingsAverage}</span></i>
          </div>
  
          <div className='relative flex justify-center items-center'>
            <button className='w-3/5 bg-[#12c843]  border-0 outline-none rounded-sm px-7 py-3 hover:bg-[#30c812]' onClick={()=>{addProduct(details?.id)}}>
              Add
            </button>
            <i className='absolute fa-solid fa-heart text-2xl right-0'></i>
          </div>
        </div>
        </div>
      </div>
  
    </>
    )
  }
 
}
