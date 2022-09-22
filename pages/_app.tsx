import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
      <div className='flex flex-col h-screen items-center bg-gradient-to-bl from-slate-700 to-black text-white'>
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp;
