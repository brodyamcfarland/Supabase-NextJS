import { useEffect, useState, useRef } from 'react';
import supabase from '../utils/supabase';

interface Message {
    id: string;
    created_at: string;
    content: string;
    profile_id: string;
    profiles: {
        username: string
    }
}

interface MessagesProps {
    roomId: string;
}

const Messages = ({roomId}: MessagesProps) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = useRef<HTMLDivElement>(null);
    const userId = supabase.auth.user()?.id;

    const getData = async () => {
        const { data } = await supabase.from<Message>('messages').select('*, profiles(username)').match({room_id: roomId}).order('created_at');
        if (!data) {
            alert('No Data Available')
            return
        };
        setMessages(data);
        if(messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        const subscription = supabase.from<Message>(`messages:room_id=eq.${roomId}`).on('INSERT', () => {
            getData()
        }).subscribe()

        return () => {
            supabase.removeSubscription(subscription)
        }
    }, []);
    
  return (
    <div className='overflow-y-scroll flex-1 bg-gradient-to-tr from-black to-[#474747] border-gray-700 border-r-[1px] border-l-[1px] mt-12' ref={messagesRef}>
        <ul className='flex flex-col justify-end p-4 space-y-2'>
            {messages.map((message) => (
            <li key={message.id} className={message.profile_id === userId ? 'self-end rounded-md bg-orange-800 px-3 py-1 shadow-md' : 'self-start rounded-md bg-gray-700 px-3 py-1 shadow-md'}>
                <span className='block text-xs text-left text-gray-400'>{message.profiles.username}</span>
                <span className=''>{message.content}</span>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Messages;