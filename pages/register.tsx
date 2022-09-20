import supabase from '../utils/supabase';
import { useState } from 'react';
import Header from '../components/Header';

export default function Register() {
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
    }

    return (
        <>
            <Header/>
            <div className="flex flex-col justify-center items-center mt-10 w-[90%] md:w-[60%] lg:w-[40%] bg-[#000000b0] rounded-md shadow-lg select-none">
                <h1 className='py-2 font-bold'>Sign Up</h1>
                <form className="flex flex-col w-full px-10 mb-3 text-left" onSubmit={handleSubmit}>
                    <h1 className='text-gray-500 text-sm'>Email</h1>
                    <input className='mb-4 rounded-md pl-2 text-black' type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <h1 className='text-gray-500 text-sm'>Username</h1>
                    <input className='mb-4 rounded-md pl-2 text-black' type="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <h1 className='text-gray-500 text-sm'>Password</h1>
                    <input className='mb-4 rounded-md pl-2 text-black' type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className='rounded-md px-2 py-1 shadow-lg w-[40%] md:w-[20%] m-auto bg-orange-800 opacity-70 hover:opacity-100 duration-500' type="submit">Sign up</button>
                </form>
            </div>
        </>
    )
}