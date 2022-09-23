import React from 'react';
import Header from '../components/Header';
import { PropagateLoader } from 'react-spinners';

const confirmation = () => {

  return (
    <>
        <Header/>
        <div className="flex flex-col text-center justify-center items-center mt-10 w-[90%] md:w-[60%] lg:w-[40%] bg-[#000000b0] rounded-md shadow-lg select-none border border-gray-700">
            <h1 className='font-bold text-lg my-5'>Verify Email</h1>
            <div className=''>
                <p className='text-sm mb-10'>Please check your email and click on the verification link to continue.<PropagateLoader color='orange' size={20} className='py-10'/></p>
                <p className="text-gray-500 text-xs pt-4 pb-5 ">Already verified? Go to <a href='/' className='underline font-bold hover:text-emerald-300 duration-500 text-emerald-500'>Home Page.</a></p>
            </div>
        </div>
    </>
  )
}

export default confirmation