import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import { useRouter } from 'next/router';
import { HiOutlinePencil } from 'react-icons/hi';

const profile = () => {
    const [profile, setProfile] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    }, [])
    
    const fetchProfile = async () => {
        const profileData = await supabase.auth.user();
        if (!profileData) {
            router.push('/login');
        } else {
            setProfile(profileData);
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    }

    if (!profile) return null;

  return (
    <div className='flex flex-col text-center mt-10 w-[90%] md:w-[60%] lg:w-[50%] h-[20rem] bg-[#000000b0] rounded-md shadow-lg select-none text-sm'>
        <h1 className='text-lg font-bold py-3'>My Profile</h1>
        <div className='flex flex-row text-left px-10'>
            <div className='flex flex-col border bg-orange-800 opacity-80'>
                <p className='border-b-[1px] p-2'>Email</p>
                <p className='border-b-[1px] p-2'>ID</p>
                <p className='border-b-[1px] p-2'>Username</p>
                <p className='p-2'>Bio</p>
            </div>
            <div className='flex flex-col flex-1 border border-l-0 bg-slate-900'>
                <p className='border-b-[1px] p-2'>{profile?.email}</p>
                <p className='border-b-[1px] p-2'>{profile?.id}</p>
                <div className='flex flex-row items-center border-b-[1px]'>
                    <p className='p-2 flex-1'>Test!</p>
                    <div className='px-2 mr-3 py-1 rounded-md bg-orange-800 opacity-70 hover:opacity-100 duration-500 cursor-pointer'>
                        <HiOutlinePencil size={18}/>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <p className='p-2 flex-1'>Test!</p>
                    <div className='px-2 mr-3 py-1 rounded-md bg-orange-800 opacity-70 hover:opacity-100 duration-500 cursor-pointer'>
                        <HiOutlinePencil size={18}/>
                    </div>
                </div>

            </div>
        </div>
        <button className='bg-red-800 px-4 py-2 mt-9 m-auto shadow-lg rounded-md opacity-70 hover:opacity-100 duration-500 text-sm w-[5rem]' onClick={signOut}>Logout</button>
    </div>
  )
};

export default profile;