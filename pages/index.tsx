import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import supabase from '../utils/supabase';
import { MdSend } from 'react-icons/md';

export async function getStaticProps() {
  const { data: posts, error } = await supabase.from('messages').select('*');
  if (error) {
    console.log(error);
  }
  return {
    props: {
      posts,
    }
  }
}

const Home: NextPage = (posts) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { message } = Object.fromEntries(
      new FormData(e.currentTarget)
    )
    if (typeof message === 'string' && message.trim().length !== 0) {
      const { error, data } = await supabase.from('messages').insert({ content: message });
      console.log({ error, data });
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col items-stretch px-20 text-center">
      <Head>
        <title>Supabase Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className='flex-1 bg-gradient-to-tr from-black to-[#474747] border-r-[1px] border-l-[1px]'>
          
        </div>
        <form className='bg-[#000000b0] h-14 flex flex-row items-center justify-between px-5 border-r-[1px] border-l-[1px] border-t-[1px]'
              onSubmit={handleSubmit}>
          <input className='w-full rounded-md px-2 py-1 shadow-inner bg-gray-800 text-white' type='text' name='message' placeholder='...'></input>
          <button type='submit' className='flex justify-center items-center h-8 w-8 rounded-full ml-10 bg-orange-800 opacity-60 hover:opacity-100 duration-500'><MdSend size={20} /></button>
        </form>
    </div>
  )
}

export default Home
