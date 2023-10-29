import Layout from '../components/layout';
import type { GetStaticProps } from 'next';

// use getStaticProps will make this page static and Nextjs will generate static site in build time
export const getStaticProps = (async () => {
  return { props: {} };
}) satisfies GetStaticProps<{}>;

export default function Home() {
  return (
    <Layout className=''>
      <h1 className='font-bold text-5xl'>Hùng Long</h1>
      <p className='font-thin'>Software Engineer</p>
    </Layout>
  );
}
