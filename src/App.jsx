import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import Swal from 'sweetalert2'

const App = () => {
  const  input = useRef();
  const [data , setData] = useState(null);
  function Check(e){
    {input.current.value === '' ? alert('Enter Username'):
      e.preventDefault();
    axios(` https:api.github.com/users/${input.current.value}`)
    .then((res)=>{
      setData(res.data) 
      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Search complete",
        showConfirmButton: false,
        timer: 1500
      });
    }).catch((err)=>{
      alert("Enter Correct Username");
      
    })
    }
    
    
  }



  return (
    <>
    <h1 className='text-center text-white text-2xl font-bold mt-5'>Github Profile Search App</h1>
    <form onSubmit={Check} className='text-center mt-10 flex justify-center items-center gap-2 '>
      <input type="text" placeholder="Enter Username" className="input input-bordered w-full max-w-xs"  ref={input} />
      <button type='submit' className="btn w-[100px]">Check</button>
    </form>
    <div className=''>
      {data !== null ?(
       [ 
      data.avatar_url !== "" || data.blog !== "" || data.bio !== "" ?(
        [
          <div key={data.id} className=' w-[50%] mx-auto mt-10 text-center'>
         {data.avatar_url !== "" ?   <img className='w-[280px] m-auto' src={data.avatar_url} alt=""/>:<h1 className='text-white'>No profile picure</h1>}
         {data.name !== '' ? <h1 className='text-white mt-3 text-2xl'>{data.name} </h1> : ''}
        {data.bio !== '' ? <h1 className='text-white text-xl'>{data.bio}</h1> : '' }
         <div className='flex justify-center gap-3 mb-4'>
         {data.followers !== '' ? <h1 className='text-white'>{data.followers} Followers</h1> : ''}
         {data.following !== '' ? <h1 className='text-white'>{data.following} Following</h1> : ''}
         </div>
        {data.blog !== "" ? <a  target='_blank' className='text-white  border border-solid p-2 rounded text-center cursor-pointer '  href={data.blog}>My Portfolio</a> : ""}
         </div>
        ]
      ):[alert('No user found'),
      input.current.value = ''
    ]
       

       
        ]

      ):""
      }
      
    
     
    </div>

    
    </>
  )
}

export default App