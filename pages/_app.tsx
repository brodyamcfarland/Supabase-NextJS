import '../styles/globals.css';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import supabase from '../utils/supabase';
import { Auth } from '@supabase/ui';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [authState, setAuthState] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <div className='flex min-h-screen flex-col items-center bg-gradient-to-bl from-slate-700 to-black text-white'>
        <Header
          authState={authState}
          setAuthState={setAuthState}
        />
        <Component {...pageProps} />
      </div>
    </Auth.UserContextProvider>
  )
}

export default MyApp;
