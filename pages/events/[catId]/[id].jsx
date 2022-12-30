export default function EventsCatPage({ event }) {
  return (
    <>
      <main>
        <div>
          <h2>{event?.title}</h2>
          <img src={event?.image} alt={event?.description} />
          <p>{event?.description}</p>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { allEvents = [] } = await import('/data/data.json');
  const paths = allEvents?.map((item) => ({
    params: {
      catId: item?.city,
      id: item?.id,
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents = [] } = await import('/data/data.json');
  const event = allEvents.find((i) => i?.id === context?.params?.id);
  return {
    props: {
      event,
    },
  };
}
