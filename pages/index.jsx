import Head from 'next/head';
import Header from '/src/components/header';
import Link from 'next/link';

export default function Home({ data = [] }) {
  return (
    <>
      <Header />
      <main>
        {data.map((i) => (
          <Link key={i?.id} href={i?.id ? `/events/${i?.id}` : '/'}>
            <img src={i?.image} alt={i?.description} />
            <h2>{i?.title}</h2>
            <p>{i?.description}</p>
          </Link>
        ))}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { events_categories } = await import('/data/data.json');
  return {
    props: {
      data: events_categories,
    },
  };
}
