import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react';
import supabase from '../utils/supabase';
import { MdSend } from 'react-icons/md';
import Messages from '../components/Messages';



const Home: NextPage = (posts) => {

  const [message, setMessage] = useState<string>('');

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message.length > 0) {
      const { error, data } = await supabase.from('messages').insert({ content: message });
      if (error) {
          alert(error.message);
      }
    }
    e.target.reset();
  };

  return (
    <div className="flex flex-col h-screen w-full px-3 md:px-20 text-center">
      <Head>
        <title>Supachat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Messages/>
      <form className='bg-[#000000b0] py-2 flex flex-row items-center justify-between px-5 border-gray-700 border-r-[1px] border-l-[1px] border-t-[1px]'
        onSubmit={sendMessage}
      >
          <input onChange={(e) => setMessage(e.target.value)}className='w-full rounded-md px-2 py-1 shadow-inner bg-gray-800 text-white' type='text' name='message' placeholder='...'></input>
          <div>
            <button type='submit' className='flex justify-center items-center h-8 w-8 rounded-full ml-2 bg-emerald-600 opacity-60 hover:opacity-100 duration-500'><MdSend size={20} /></button>
          </div>
      </form>
    </div>
  )
}

export default Home
