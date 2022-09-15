import supabase from "../utils/supabase";
import { useRouter } from 'next/router';
import { useState } from 'react';

const login = () => {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (typeof email === 'string' && typeof password === 'string') {
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
    <div className="flex flex-col text-center mt-10 w-[90%] md:w-[60%] lg:w-[40%] h-[20rem] bg-[#000000b0] rounded-md shadow-lg select-none">
        <h1 className="my-2 font-bold text-xl mt-5">Log In</h1>
        <form className='p-4 flex flex-col' onSubmit={handleSubmit}>
            <input placeholder='email@gmail.com' className='w-[90%] md:w-[80%] lg:w-[60%] m-auto mb-10 text-black pl-2 rounded-md text-sm py-1' onChange={(e) => setEmail(e.target.value)} type="email" id="email" name='email' />
            <input className='w-[90%] md:w-[80%] lg:w-[60%] m-auto mb-10 text-black pl-2 rounded-md text-sm py-1' onChange={(e) => setPassword(e.target.value)} type="password" id="password" name='email' />
            <button className='rounded-md px-2 py-1 shadow-lg w-[40%] md:w-[20%] m-auto bg-orange-800 opacity-70 hover:opacity-100 duration-500' type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default login;