import supabase from '../utils/supabase';
import { useEffect } from 'react';

export async function getServerSideProps({ params }: any) {
    const { data: post, error } = await supabase.from('posts').select('*, comments(*)').eq('id', params.id).single();
    if (error) {
        console.log(error);
    }
    return {
        props: {
            post
        }
    };
};

const PostPage = ({ post }: any) => {

    useEffect(():any => {
      const subscription = supabase.from('comments').on('INSERT', (payload) => {
        console.log(payload);
      }).subscribe();

      return () => supabase.removeSubscription(subscription);
    }, []);
    

    return (
        <div>
            <h1>{post?.title}</h1>
            <p>{post?.content}</p>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
    )
};

export default PostPage;