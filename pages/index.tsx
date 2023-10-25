import Head from 'next/head';
import Layout from '../components/layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hung Long portfolio</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout className='fade-in-1s'>
        <h1 className='font-bold text-5xl'>Hùng Long</h1>
        <h4 className='font-thin '>Software Engineer</h4>
      </Layout>
    </>
  );
}
