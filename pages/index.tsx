import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import Link from 'next/link';
import Header, { Room } from '../components/Header';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Home: NextPage = (posts) => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleNewRoom = async () => {
    const { data, error } = await supabase.rpc<Room>('create_room').single();

    if (error) {
      toast.error(`Error: ${error.message}`);
      return;
    }

    if (data) {
      router.push(`/rooms/${data.id}`)
    }
  }

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await supabase.from<Room>('rooms').select('*').order('created_at', {ascending: false})

      if (data) {
        setRooms(data);
      }
    }
    getRooms();
  }, []);

  
  return (
    <>
      <Header/>
      <div className="flex flex-col h-screen w-full px-3 md:px-20 text-center">
        <Head>
          <title>Supachat</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='bg-[#000000b0] mx-3 py-2 md:mx-20 border-r-[1px] border-l-[1px] border-b-[1px] border-gray-700 shadow-md flex px-5 justify-between'>
          <div className='font-bold'>My Rooms</div>
          <button onClick={handleNewRoom} className='text-xs px-2 h-7 rounded-md bg-emerald-700 opacity-70 hover:opacity-100 duration-500'>+ New Room</button>
        </div>
        <div className='flex-1 flex-col text-left flex bg-gradient-to-tr from-black to-[#474747] p-4 mx-3 md:mx-20 border-r-[1px] border-l-[1px] border-b-[1px] border-gray-700 shadow-md'>
          {rooms.map(room => (
            <div key={room.id}>
              <p className='inline-block border border-emerald-500 px-2 mb-1 rounded-md bg-emerald-900 opacity-60 hover:opacity-100 duration-500'>
                <Link href={`/rooms/${room.id}`}>
                  <a>{room.name ?? 'Untitled'}</a>
                </Link>
              </p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default Home
