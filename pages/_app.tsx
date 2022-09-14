import '../styles/globals.css';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import supabase from '../utils/supabase';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [authState, setAuthState] = useState<boolean>(false);
  const router = useRouter();

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
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-bl from-slate-700 to-black text-white'>
      <Header
        authState={authState}
        setAuthState={setAuthState}
      />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
