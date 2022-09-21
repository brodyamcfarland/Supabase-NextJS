import supabase from "../utils/supabase";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from "../components/Header";

const login = () => {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.length > 0 && password.length > 0) {
        const { error } = await supabase.auth.signIn({
            email,
            password,
        })
        if (error) {
            alert(error.message)
            return
        }
        router.push('/')
        }
    }

  return (
    <>
        <Header/>
        <div className="flex flex-col text-center mt-10 w-[90%] md:w-[60%] lg:w-[40%] bg-[#000000b0] rounded-md shadow-lg select-none border border-gray-700">
            <h1 className="my-2 font-bold text-xl mt-5">Log In</h1>
            <form className='p-4 flex flex-col' onSubmit={handleSubmit}>
                <div className="text-sm text-gray-400">Email</div>
                <input placeholder='email@gmail.com' className='w-[90%] md:w-[80%] lg:w-[60%] m-auto mb-10 pl-2 text-black rounded-md text-sm py-1' onChange={(e) => setEmail(e.target.value)} type="email" id="email" name='email' />
                <div className="text-sm text-gray-400">Password</div>
                <input className='w-[90%] md:w-[80%] lg:w-[60%] m-auto mb-10 text-black pl-2 rounded-md text-sm py-1' onChange={(e) => setPassword(e.target.value)} type="password" id="password" name='email' />
                <button className='bg-orange-800 px-4 py-2 shadow-lg rounded-md opacity-70 hover:opacity-100 duration-500 text-sm w-[5rem] m-auto' type='submit'>Login</button>
                <p className="text-gray-500 text-xs pt-4">Don't have an account? Sign up <a href='/register' className='underline font-bold hover:text-emerald-300 duration-500 text-emerald-500'>here</a></p>
            </form>
        </div>
    </>
  )
}

export default login;