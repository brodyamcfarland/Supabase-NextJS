import { useRouter } from 'next/router';
import supabase from '../utils/supabase';
import { useState, useEffect } from 'react';

interface Props {
    authState: boolean;
    setAuthState: any;
}

const supabaseImage = '/supabase.jpg';

const Header = ({authState, setAuthState}: Props) => {
    const [navActive, setNavActive] = useState<boolean>(false);
    const router = useRouter();

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
        setAuthState(false);
    }

    const clickNav = (e: any) => {
        e.preventDefault();
        setNavActive(!navActive);        
    }

    const clickProfile = () => {
      router.push('/profile');        
    }

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event: any, session: any) => {
          handleAuthChange(event, session);
          if ( event === 'SIGNED_IN') {
            setAuthState(true);
            router.push('/profile');
          }
          if ( event === 'SIGNED_OUT') {
            setAuthState(false);
          }
        })
        checkUser();
        return () => {
          authListener?.unsubscribe();
        }
      }, []);

      const handleAuthChange = async (event: any, session: any) => {
        await fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        });
      };
    
      const checkUser = async () => {
        const user = await supabase.auth.user();
        if (user) {
          setAuthState(true);
        };
      };

  return (
    <>
        <div className='flex items-center justify-between px-5 h-14 w-full bg-[#000000b0] border-b-[1px] select-none'>
                <button className='w-[76px]' onClick={(e) => clickNav(e)}>
                    <img className={`h-10 w-10 rounded-full border-[5px] border-orange-800 hover:rotate-180 hover:border-[9px] hover:border-red-900 duration-700 ${navActive && 'border-[9px] border-red-900'}`} src={supabaseImage} alt='logo_home' />
                </button>
                <button onClick={clickHome}>
                    <div className="text-2xl font-extrabold uppercase hover:animate-pulse">Supachat</div>
                </button>
                <div className='w-[76px]'>
                {authState === false ?
                (<button onClick={clickLogin} className='bg-orange-800 px-4 py-2 shadow-lg rounded-md opacity-70 hover:opacity-100 duration-500 text-sm'>Sign In</button>)
                : (<button onClick={clickLogout} className='bg-red-800 px-4 py-2 shadow-lg rounded-md opacity-70 hover:opacity-100 duration-500 text-sm'>Logout</button>)}
                </div>
        </div>
        {navActive && (
            <div className='bg-[#00000069] backdrop-blur-md absolute left-10 top-[55px] w-[15rem] rounded-bl-md rounded-br-md'>
                <div className='flex flex-col gap-3 p-3 select-none'>
                    <div onClick={clickHome} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Home</div>
                    <div onClick={clickHome} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Main Chat</div>
                    <div onClick={clickHome} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Rooms</div>
                    <div onClick={clickProfile} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Profile</div>
                    <div onClick={clickLogin} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Log In</div>
                    <div onClick={clickSignUp} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Sign Up</div>
                    <div onClick={clickLogout} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>Log Out</div>
                    <div onClick={clickHome} className='p-2 flex-1 rounded-md hover:bg-[#c26c324b] duration-500 cursor-pointer'>About</div>
                </div>
            </div>
        )}
    </>
  )
}

export default Header