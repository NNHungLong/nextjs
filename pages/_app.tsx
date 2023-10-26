import Navbar from '../components/navbar';
import Head from 'next/head';
import 'styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hung Long portfolio</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Hung Long portfolio - software engineer'
          key='desc'
        />
      </Head>
      <div className='flex bg-neutral-600'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
}
