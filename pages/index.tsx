import type { NextPage } from 'next'
import Head from 'next/head'
import supabase from '../utils/supabase';

export async function getStaticProps() {
  const { data: posts, error } = await supabase.from('posts').select('*');
  if (error) {
    console.log(error);
  }
  return {
    props: {
      posts,
    }
  }
}

const Home: NextPage = (posts) => {

  console.log(supabase.auth.user());
  console.log(posts);

  return (
    <div className="">
      <Head>
        <title>Supabase Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{JSON.stringify(posts, null, 2)}</div>
      
    </div>
  )
}

export default Home
