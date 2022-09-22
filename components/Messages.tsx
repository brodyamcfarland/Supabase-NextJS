import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import supabase from '../utils/supabase';
import { Message, MessagesProps, Profile, ProfileCache } from '../utils/types';

const Message = ({ message, profile, setProfileCache }: {message: Message, profile?: Profile, setProfileCache: Dispatch<SetStateAction<ProfileCache>>}) => {

    const userId = supabase.auth.user()?.id;

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await supabase.from('profiles').select('id, username').match({ id: message.profile_id }).single();

            if(data) {
                setProfileCache(current => ({
                    ...current,
                    [data.id]: data
                }))
            }
        }
        if(!profile) {
            fetchProfile();
        }
    }, [profile, message.profile_id])

    return (
        <li key={message.id} className={message.profile_id === userId ? 'self-end rounded-md bg-orange-800 px-3 py-1 shadow-md' : 'self-start rounded-md bg-gray-700 px-3 py-1 shadow-md'}>
            <span className='block text-xs text-left text-gray-400'>{profile?.username ?? 'Loading...'}</span>
            <span className=''>{message.content}</span>
        </li>
    )
}

const Messages = ({roomId, profileCache, setProfileCache}: MessagesProps) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = useRef<HTMLDivElement | null>(null!);

    const getData = async () => {
        const { data } = await supabase.from<Message>('messages').select('*, profile: profiles(id, username)').match({room_id: roomId}).order('created_at');
        if (!data) {
            alert('No Data Available')
            return
        }
        
        const newProfiles = Object.fromEntries(
            data
                .map((message) => message.profile)
                .filter(Boolean)
                .map(profile => [profile!.id, profile!])
        )

        setProfileCache((current) => ({
            ...current, 
            ...newProfiles
        }))

        setMessages(data);

        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        const subscription = supabase
          .from<Message>(`messages:room_id=eq.${roomId}`)
          .on('INSERT', (payload) => {
            setMessages((current) => [...current, payload.new])
            if (messagesRef.current) {
              messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            }
          })
          .subscribe()
    
        return () => {
          supabase.removeSubscription(subscription)
        }
      }, [])
    
  return (
    <div className='overflow-y-scroll scrollbar-hide h-screen bg-gradient-to-tr from-black to-[#474747] border-gray-700 border-r-[1px] border-l-[1px] mx-3 md:mx-20' ref={messagesRef}>
        <ul className='flex flex-col flex-1 justify-end p-4 space-y-2'>
            {messages.map((message) => (
                <Message
                    key={message.id}
                    message={message}
                    profile={profileCache[message.profile_id]}
                    setProfileCache={setProfileCache}
                />
            ))}
        </ul>
    </div>
  )
}

export default Messages;