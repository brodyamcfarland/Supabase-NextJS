import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import supabase from '../../utils/supabase';
import { MdSend } from 'react-icons/md';
import Messages from '../../components/Messages';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import UserList from '../../components/UserList';
import {ProfileCache, Profile } from '../../utils/types';
import { HiOutlinePencil } from 'react-icons/hi';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

const Room = () => {
  const [profileCache, setProfileCache] = useState<ProfileCache>({});
  const [roomName, setRoomName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [inviteInput, setInviteInput] = useState<string>('');
  const router = useRouter();
  const roomId = router.query.id as string;

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message.length > 0) {
      const { error, data } = await supabase.from('messages').insert({ content: message, room_id: roomId });
      if (error) {
        toast.error(`Error: ${error.message}`)
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

  const handleInviteButton = async (e: any) => {
      e.preventDefault();
      const { data } = await supabase.from<Profile>('profiles').select('id, username').match({ username: inviteInput }).single()
      console.log(`Invite sent to ${inviteInput}`)
      if (!data) {
        toast.error("User has already been invited or not found!")
        return;
      }
      const { error } = await supabase.from('room_participants').insert({profile_id: data.id, room_id: roomId});
      if (error) {
        toast.error(`Error! User has already been invited.`)
        return;
      }
      toast.success(`Invite has been sent to: ${inviteInput}`);
      setInviteInput('');
      e.target.reset();
  };

  const handleEditRoomName = async () => {
    const newRoomName = prompt('Rename Room to:');
    const oldRoomName = roomName;
    if (!newRoomName) return;
    setRoomName(newRoomName);
    const { data, error } = await supabase.from('rooms').update({ name: newRoomName }).match({ id: roomId });
    if (error) {
      toast.error(`Error: ${error.message}`)
      setRoomName(oldRoomName);
    }
  };

  return (
    <div className="flex flex-col max-h-screen w-full text-center">
      <Head>
        <title>Supachat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className='bg-[#000000b0] flex flex-row items-center pl-5 justify-between mx-3 md:mx-20 border-r-[1px] border-l-[1px] border-b-[1px] border-gray-700 shadow-md'>
        <div className='flex items-center'>
          <div className='font-semibold pr-2'>{roomName}</div>
          <button onClick={handleEditRoomName} className='flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#ffffff23] duration-500'><HiOutlinePencil/></button>
        </div>
        <div className='flex flex-col py-1 pr-3'>
          <div className='text-emerald-500 text-xs text-left pl-2'>Invite</div>
          <form onSubmit={handleInviteButton} className='flex flex-row items-center justify-center gap-3'>
            <input onChange={(e) => setInviteInput(e.target.value)} placeholder='Username' className='w-[125px] sm:w-full h-6 text-sm mb-1 mr-1 rounded-md shadow-inner bg-gray-800 text-white' type='text' />
            <button type='submit' className='opacity-60 hover:opacity-100 duration-300 pb-1'><BsFillArrowRightCircleFill size={25} color='green'/></button>
          </form>
        </div>
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
          <input onChange={(e) => setMessage(e.target.value)} className='w-full rounded-md px-2 py-1 shadow-inner bg-gray-800 text-white' type='text' name='message' placeholder='...'></input>
          <button type='submit' className='flex border-[2px] border-gray-100 justify-center items-center h-8 w-8 rounded-full ml-2 bg-emerald-600 opacity-60 hover:opacity-100 duration-500'><MdSend size={20} /></button>
          
      </form>
      <UserList profileCache={profileCache} />
    </div>
  )
}

export default Room;