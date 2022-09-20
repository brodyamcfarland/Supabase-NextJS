import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import supabase from '../../utils/supabase';
import { MdSend } from 'react-icons/md';
import Messages from '../../components/Messages';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import UserList from '../../components/UserList';
import {ProfileCache, Profile } from '../../utils/types';

const Room = () => {
  const [profileCache, setProfileCache] = useState<ProfileCache>({});
  const [roomName, setRoomName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const roomId = router.query.id as string;

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message.length > 0) {
      const { error, data } = await supabase.from('messages').insert({ content: message, room_id: roomId });
      if (error) {
          alert(error.message);
      }
    }
    e.target.reset();
  };

  useEffect(() => {
    const getRoomName = async () => {
      const { data } = await supabase.from('rooms').select('name').match({
        id: roomId
      }).single();

      setRoomName(data.name ?? 'Untitled')
    };

    if (roomId) {
      getRoomName();
    }
  }, [roomId]);

  const handleInvite = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.currentTarget;

      const { data } = await supabase.from<Profile>('profiles').select('id, username').match({ username: target.value }).single()

      if (!data) {
        return alert('User not found!')
      }

      const { error } = await supabase.from('room_participants').insert({profile_id: data.id, room_id: roomId});

      if (error) {
        return alert(error.message);
      }

      target.value = '';
    };
  };

  return (
    <div className="flex flex-col max-h-screen w-full text-center">
      <Head>
        <title>Supachat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className='bg-[#000000b0] flex flex-row items-center pl-5 justify-between mx-3 md:mx-20 border-r-[1px] border-l-[1px] border-b-[1px] border-gray-700 shadow-md'>
        <div className='font-semibold'>{roomName}</div>
        <input onKeyPress={handleInvite} className='h-8 m-1' type='text' />
      </div>
      {roomId && <Messages 
                    roomId={roomId}
                    profileCache={profileCache}
                    setProfileCache={setProfileCache}
                  />
      }
      <form className='bg-[#000000b0] py-2 flex flex-row items-center justify-between px-5 border-gray-700 border-r-[1px] border-l-[1px] border-t-[1px] mx-3 md:mx-20 '
        onSubmit={sendMessage}
      >
          <input onChange={(e) => setMessage(e.target.value)}className='w-full rounded-md px-2 py-1 shadow-inner bg-gray-800 text-white' type='text' name='message' placeholder='...'></input>
          <div>
            <button type='submit' className='flex border-[2px] border-gray-100 justify-center items-center h-8 w-8 rounded-full ml-2 bg-emerald-600 opacity-60 hover:opacity-100 duration-500'><MdSend size={20} /></button>
          </div>
      </form>
      <UserList profileCache={profileCache} />
    </div>
  )
}

export default Room;