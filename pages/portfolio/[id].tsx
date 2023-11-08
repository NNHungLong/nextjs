import Layout from '../../components/layout';
import { portfolioData } from '../../data/portfolio';
import PageTitle from '../../components/pageSubtitle';
import { useRouter } from 'next/router';

export default function PortfolioById({ portfolio }) {
  const router = useRouter();
  const handleClickBackBtn = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    router.back();
  };
  return (
    <Layout>
      <PageTitle text={portfolio?.title} />
      <div className='cursor-pointer' onClick={handleClickBackBtn}>
        Back
      </div>
      <h1>{portfolio.id}</h1>
      <p>{portfolio.description}</p>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPortfolioWithParams();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const portfolio = portfolioData.find((item) => item.id === params.id);
  return {
    props: {
      portfolio,
    },
  };
}

interface AllPortfolioWithParams {
  params: {
    id: string;
  };
}

export function getAllPortfolioWithParams(): AllPortfolioWithParams[] {
  return portfolioData.map((item) => {
    return {
      params: {
        id: item?.id.toString(),
      },
    };
  });
}
