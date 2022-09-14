import supabase from "../utils/supabase";
import { useState } from "react";
import PropagateLoader from 'react-spinners/PropagateLoader';

const login = () => {

    const [email, setEmail] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!email) return;
        await supabase.auth.signIn({ email });
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="flex flex-col justify-center items-center mt-10 w-[90%] md:w-[60%] lg:w-[40%] bg-[#000000b0] rounded-md shadow-lg select-none">
                <h1 className="text-sm h-[10rem] flex items-center justify-center px-5">Please check your email and Click the Magic Link to Log In...</h1>
                <div className="py-10 mb-10">
                    <PropagateLoader color='orange' size={16}/>
                </div>
            </div>
        )
    }

  return (
    <div className="flex flex-col text-center mt-10 w-[90%] md:w-[60%] lg:w-[40%] h-[20rem] bg-[#000000b0] rounded-md shadow-lg select-none">
        <h1 className="my-2 font-bold text-xl mt-5">Log In</h1>
        <p className="text-sm text-gray-400 mb-2">Please enter your email and verify to login.</p>
        <form className='p-4 flex flex-col' onSubmit={handleSubmit}>
            <label className="text-xs text-gray-500" htmlFor="email">Email</label>
            <input placeholder='email@gmail.com' className='w-[90%] md:w-[80%] lg:w-[60%] m-auto mb-10 text-black pl-2 rounded-md text-sm py-1' onChange={(e) => setEmail(e.target.value)} type="email" id="email" name='email' />
            <button className='rounded-md px-2 py-1 shadow-lg w-[40%] md:w-[20%] m-auto bg-orange-800 opacity-70 hover:opacity-100 duration-500' type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default login;