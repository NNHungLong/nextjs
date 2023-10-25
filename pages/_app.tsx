import Navbar from '../components/navbar';
import 'styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className='flex bg-neutral-600'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
