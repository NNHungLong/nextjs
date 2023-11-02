import Layout from '../../components/layout';
import Shop from '../../public/icons/shop';
import PC from '../../public/icons/pc';
import Phone from '../../public/icons/phone';
import ChatDot from '../../public/icons/chatdot';
import { Logos } from '../../components/logo';
import PageTitle from '../../components/pageTitle';
import PageSubtitle from '../../components/pageSubtitle';
import Image from 'next/image';

const selfIntroduction = [
  `My name is Long, I am a software engineer with more than four
  years of experience. I spent two years developing a React Native
  app, and two and a half years as a full stack Engineer using LAMP
  stack.`,
  `I am a self-taught developer, I have a strong passion for learning
  new technologies. I am a fast learner, I can learn new
  technologies quickly and apply them to my work.`,
];
const personalInfo = {
  Age: 27,
  Residence: 'Vietnam',
  Address: 'Le Van Sy street, District 3, Ho Chi Minh city',
  Email: 'ng2hunglong@gmail.com',
  Phone: '+84 929374896',
};
const whatIDoList = [
  {
    icon: <Shop width={32} height={32} />,
    title: 'E-commerce',
    description: `I have experience working on an e-commerce project. I have built Wordpress websites for ecommerce businesses`,
  },
  {
    icon: <PC width={32} height={32} />,
    title: 'Web development',
    description: `I have experience working as a full stack engineer. I have built web applications using React, Nodejs, PHP, Laravel, MySQL`,
  },
  {
    icon: <Phone width={32} height={32} />,
    title: 'Mobile development',
    description: `I have experience working on a mobile development project. I have built a mobile app using React Native`,
  },
  {
    icon: <ChatDot width={32} height={32} />,
    title: 'Communication',
    description: `I have experience working with foreign clients. I can communicate in English`,
  },
];

function renderPersonalInfo(): React.JSX.Element {
  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <div className='md:basis-3/5 leading-relaxed'>
        {selfIntroduction.map((paragraph, index) => (
          <p key={index} text-aria={'self introduction'}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className='md:basis-2/5'>
        <ul className='flex flex-col gap-2'>
          {Object.entries(personalInfo).map(([key, value]) => (
            <li key={key}>
              <span className='text-sky-500'>{key}: </span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function renderWhatIDo(): React.JSX.Element {
  return (
    <div className='mt-6'>
      <PageSubtitle text='What' highlightText='I Do' />
      <div className='flex flex-wrap gap-6'>
        {whatIDoList.map((item) => (
          <div
            key={item?.title}
            className='flex flex-col gap-4 mb-4 w-[calc(100%-1.5rem)] md:w-[calc(50%-1.5rem)]'
          >
            <div className='flex text-sky-500 rounded-full'>{item.icon}</div>
            <div className='flex flex-col'>
              <h4 className='font-bold text-xl'>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderLogos(): React.JSX.Element {
  return (
    <div className='inline-block infinite-slider py-4'>
      {Logos.map((logo) => (
        <div
          key={logo?.name}
          className='w-[280px] h-[120px] inline-block mx-4 bg-neutral-50 rounded-3xl py-3 px-10'
        >
          <Image
            className={`object-scale-down h-[100px]`}
            src={logo.component}
            width={200}
            height={100}
            alt={logo.name}
          />
        </div>
      ))}
    </div>
  );
}

function renderInfiniteScrollCarousel(): React.JSX.Element {
  return (
    <div className='mt-6 w-full'>
      <PageSubtitle text='Technologies' highlightText='I Use' />
      <div className='bg-neutral-700 whitespace-nowrap overflow-hidden'>
        {renderLogos()}
        {renderLogos()}
      </div>
    </div>
  );
}

export default function About(): React.JSX.Element {
  return (
    <Layout className='justify-start items-start p-14'>
      <div className='text-zinc-200'>
        <PageTitle text='About' highlightText='Me' />
        {renderPersonalInfo()}
        {renderWhatIDo()}
      </div>
      {renderInfiniteScrollCarousel()}
    </Layout>
  );
}
