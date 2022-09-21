import { useRouter } from 'next/router';
import supabase from '../utils/supabase';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

export interface Room {
  id: string;
  name: string | null;
  created_at: string;
}

const supabaseImage = '/supabase.jpg';

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [navActive, setNavActive] = useState<boolean>(false);
    const router = useRouter();


    useEffect(() => {
      setUser(supabase.auth.session()?.user ?? null);
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      })
    }, []);

    const clickLogin = () => {
        router.push('/login');
    }

    const clickSignUp = () => {
      router.push('/register');
    }

    const clickHome = () => {
        router.push('/');
    }

    const clickLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        setUser(null);
    }

    const clickNav = (e: any) => {
        e.preventDefault();
        setNavActive(!navActive);        
    }

    const clickProfile = () => {
      router.push('/profile');        
    }


  return (
    <>
        <div className='gap-5 md:gap-0 flex items-center justify-between px-5 py-[8px] w-full bg-black border-gray-700 border-b-[1px] select-none'>
                <div className='flex w-[10rem] md:w-[15rem] items-center'>
                  <button onClick={(e) => clickNav(e)} className='flex-1'>
                      <img className={`h-10 w-10 rounded-full border-[5px] border-orange-800 hover:rotate-180 hover:border-[9px] hover:border-red-900 duration-700 ${navActive && 'border-[9px] border-red-900'}`} src={supabaseImage} alt='logo_home' />
                  </button>
                </div>
                <button onClick={clickHome}>
                    <div className="text-md md:text-2xl font-extrabold uppercase hover:animate-pulse">Supachat</div>
                </button>
                <div className='flex flex-row items-center justify-between w-[10rem] md:w-[15rem]'>
                  <div>
                    {user && <button onClick={clickProfile} className='mr-2 text-xs md:text-sm border text-left text-gray-400 px-2 rounded-md border-emerald-700 hover:bg-emerald-500 hover:text-black duration-500 '>{user?.user_metadata.username}</button>}
                  </div>
                  <div>
                    {user === null ?
                    (<button onClick={clickLogin} className='bg-orange-800 px-4 py-2 shadow-lg rounded-md opacity-70 hover:opacity-100 duration-500 text-sm'>Login</button>)
                    : (<button onClick={clickLogout} className='bg-red-800 px-4 py-2 shadow-lg rounded-md opacity-70 hover:opacity-100 duration-500 text-sm'>Logout</button>)}
                  </div>
                </div>
        </div>
        {navActive && (
            <div className='bg-[#00000069] backdrop-blur-md absolute left-0 top-[57px] w-[15rem] rounded-bl-md rounded-br-md'>
                <div className='flex flex-col gap-3 p-3 select-none'>
                    <div onClick={clickHome} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Home</div>
                    {user && <div onClick={clickProfile} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Profile</div>}
                    {!user && <div onClick={clickLogin} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Login</div>}
                    {!user && <div onClick={clickSignUp} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Sign Up</div>}
                    {user && <div onClick={clickLogout} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Log Out</div>}
                    <div onClick={clickHome} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>About</div>
                </div>
            </div>
        )}
    </>
  )
}

export default Header