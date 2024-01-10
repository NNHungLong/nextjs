// cores
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

// utils
import Navbar from '../components/navbar';
import 'styles/globals.css';
import 'styles/markdown.css';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
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
      <div className='flex bg-neutral-700 w-screen h-screen overflow-hidden'>
        <Navbar />
        <AnimatePresence mode='sync' initial={false}>
          <Component {...pageProps} key={pathname} />
        </AnimatePresence>
      </div>
    </>
  );
}
