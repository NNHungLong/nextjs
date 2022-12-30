import Head from 'next/head';
import Link from 'next/link';

export default function EventsCatPage({ events }) {
  return (
    <>
      <header>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/events'>Events</Link>
          <Link href='/about-us'>About Us</Link>
        </nav>
      </header>
      <main>
        {events.map((i) => (
          <Link
            key={i?.id}
            href={i?.id && i?.city ? `/events/${i?.city}/${i?.id}` : '/'}
          >
            <h2>{i?.title}</h2>
            <img src={i?.image} alt={i?.description} />
            <p>{i?.description}</p>
          </Link>
        ))}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { events_categories = [] } = await import('/data/data.json');
  const paths = events_categories?.map((item) => ({
    params: { catId: item?.id },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents = [] } = await import('/data/data.json');
  const events = allEvents.filter((i) => i?.city === context?.params?.catId);
  return {
    props: {
      events,
    },
  };
}
