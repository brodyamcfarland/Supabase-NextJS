import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
      <div className='flex flex-col h-screen items-center bg-gradient-to-bl from-slate-700 to-black text-white'>
        <Component {...pageProps} />
        <Toaster />
      </div>
  )
}

export default MyApp;
