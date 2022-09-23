import supabase from '../utils/supabase';
import { useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.length > 0 && password.length > 5 && username.length > 3) {
        await supabase.auth.signUp({email, password },{ data: { username }})}
        setPassword('');
        setEmail('');
        setUsername('');
        router.push('/confirmation')
    }

    return (
        <>
            <Header/>
            <div className="flex flex-col text-center justify-center items-center mt-10 w-[90%] md:w-[60%] lg:w-[40%] bg-[#000000b0] rounded-md shadow-lg select-none border border-gray-700">
                <h1 className='font-bold text-xl my-5'>Sign Up</h1>
                <form className="flex flex-col w-full px-10 md:px-20 xl:px-36 mb-3" onSubmit={handleSubmit}>
                    <h1 className='text-gray-400 text-sm'>Email</h1>
                    <input className='text-sm h-7 mb-4 rounded-md pl-2 text-black' type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <h1 className='text-gray-400 text-sm'>Username</h1>
                    <input className='text-sm h-7 mb-4 rounded-md pl-2 text-black' type="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <h1 className='text-gray-400 text-sm'>Password</h1>
                    <input className='text-sm h-7 mb-4 rounded-md pl-2 text-black' type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-orange-800 px-4 py-2 shadow-lg rounded-md opacity-70 hover:opacity-100 duration-500 text-sm w-[5rem] m-auto mt-6' type="submit">Sign up</button>
                    <p className="text-gray-500 text-xs pt-4">Already have an account? Sign up <a href='/login' className='underline font-bold hover:text-emerald-300 duration-500 text-emerald-500'>here</a></p>
                </form>
            </div>
        </>
    )
}