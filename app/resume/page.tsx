"use client"
import PageTitle from '../../components/pageTitle';
import PageSubtitle from '../../components/pageSubtitle';
import Logo from '../../components/logo';
import React from 'react';

const Experiences = [
  {
    time: 'Oct 2021 - 2023',
    title: 'Mobile developer',
    company: 'Tego Global',
    description: `I built a feature from the ground up that reached more than 50,000 monthly active users as a front end engineer. My responsibilities were:
    • Discussing the technical feasibility of new features with PM and designer.
    • Planning the implementation strategy and estimating the time required to finish the features.
    • Implementing the app analytics events to track the users’ behaviors on the app.
    • Implementing the code with high quality and reviewing others’ pull requests in React Native team to improve the overall quality of the code base.
    • Deploying the app to production and monitoring bug tracking tools to ensure my features ran well on production.
    • Writing documentation about implementation strategy and release notes.
    I worked from home effectively thanks to Agile methodology (We used Jira, Confluence, and BitBucket at Mine), and my proficiency with Git to resolve merge conflicts.`,
  },
  {
    time: 'Mar 2019 - May 2021',
    title: 'Full stack developer',
    company: 'Dirox',
    description: `• Worked with LAMP stack to develop a finance website.
    • Built the UI with smooth animation and perfect pixel across browsers.
    • Represented data in tables and charts using Amcharts.
    • Ran Cron job to send notifications to users.
    • Designed and implemented MySQL database.`,
  },
];
const Skills = [
  {
    name: 'HTML, CSS, JavaScript',
    level: 90,
  },
  {
    name: 'React & React Native',
    level: 80,
  },
  {
    name: 'RDBMS and No-SQL Databases',
    level: 40,
  },
  {
    name: 'TypeScript',
    level: 40,
  },
  {
    name: 'English (Verbal and Written)',
    level: 70,
  },
];
const Knowledges = [
  'React',
  'TypeScript',
  'Remix',
  'NextJs',
  'MongoDB',
  'Prettier',
  'ESLint',
  'Docker',
  'Wordpress',
  'PHP',
  'Mysql',
  'Jquery',
];
const Certificates = [
  {
    link: 'https://freecodecamp.org/certification/ng2hunglong/back-end-development-and-apis',
    name: 'Back End Development and APIs',
    logoName: 'FreeCodeCamp',
    issuer: 'freeCodeCamp',
    skills:
      'API Development • JSON • Object-Oriented Programming (OOP) • Skill Development • NoSQL',
    date: 'Oct 2021',
  },
  {
    link: 'https://freecodecamp.org/certification/ng2hunglong/front-end-development-libraries',
    name: 'Front End Development Libraries',
    logoName: 'FreeCodeCamp',
    issuer: 'freeCodeCamp',
    skills:
      'JSON • Object-Oriented Programming (OOP) • Redux.js • Skill Development',
    date: 'Sept 2021',
  },
  {
    link: 'https://freecodecamp.org/certification/ng2hunglong/javascript-algorithms-and-data-structures',
    name: 'Javascript Algorithms and Data Structures',
    logoName: 'FreeCodeCamp',
    issuer: 'freeCodeCamp',
    skills: 'Object-Oriented Programming (OOP) • Redux.js • Skill Development',
    date: 'Sept 2021',
  },
];

function renderExperience(): React.JSX.Element {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <PageSubtitle text='Experience' />
        <div className='flex flex-col'>
          {Experiences.map((item) => (
            <div key={item?.time} className='flex relative'>
              <div className='flex flex-col text-right pr-4 relative w-[85px] md:w-[170px] shrink-0'>
                <h4 className='text-zinc-400 text-sm mb-2'>{item?.time}</h4>
                <h4 className='text-zinc-400 text-base font-bold'>
                  {item?.company}
                </h4>
                <div className='absolute top-0 right-0 bottom-0 w-[1px] bg-zinc-200 dot-highlight' />
              </div>
              <div className='px-4 pb-4'>
                <h4 className='text-zinc-200 text-base font-bold mb-2'>
                  {item?.title}
                </h4>
                {item?.description.split('\n').map((line, index) => (
                  <p className='text-zinc-400 text-sm' key={index}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBar({
  name,
  level,
}: {
  name: string;
  level: number;
}): React.JSX.Element {
  return (
    <div className='mb-4'>
      <div className='flex justify-between mb-2'>
        <span className='text-zinc-400 text-base font-bold'>{name}</span>
        <span className='text-zinc-400 text-sm'>{level}%</span>
      </div>
      <div className='w-full h-2 bg-zinc-700 rounded-lg border-sky-400 border p-[1px]'>
        <div
          className='h-full bg-sky-500 rounded-lg'
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function KnowledgeItem({ text }: { text: string }): React.JSX.Element {
  return (
    <div className='bg-sky-400 rounded-sm px-2 py-1 inline-block text-center text-sm text-zinc-700 grow'>
      {text}
    </div>
  );
}

function renderSkills(): React.JSX.Element {
  return (
    <div className='flex sm:flex-row flex-col gap-8 mt-8'>
      <div className='flex flex-col grow'>
        <PageSubtitle text='Skills' />
        <div className='flex flex-col'>
          {Skills.map((item) => (
            <SkillBar key={item?.name} name={item?.name} level={item?.level} />
          ))}
        </div>
      </div>
      <div className='flex flex-col sm:w-[clamp(320px,40%,500px)]'>
        <PageSubtitle text='Knowledges' />
        <div className='inline-flex flex-wrap justify-between gap-2'>
          {Knowledges.map((item) => (
            <KnowledgeItem text={item} key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CertificateCardProps {
  link: string;
  name: string;
  logoName: string;
  issuer: string;
  skills: string;
  date: string;
}

function openNewTabLink(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  e.preventDefault();
  window.open(e.currentTarget.href, '_blank');
}

function CertificateCard({
  link,
  name,
  logoName,
  issuer,
  skills,
  date,
}: CertificateCardProps): React.JSX.Element {
  return (
    <a
      className='flex border-neutral-700 border-2 gap-4 mb-4 hover:border-sky-500 transition-all'
      target='_blank'
      href={link}
      onClick={openNewTabLink}
    >
      <div className='flex justify-center items-center bg-neutral-700 p-7 w-[120px] grow-0 shrink-0'>
        <Logo name={logoName} width={70} height={70} />
      </div>
      <div className='flex flex-col justify-center py-4 pr-2'>
        <h3 className='text-zinc-200 text-lg font-bold mb-2'>{name}</h3>
        <h4 className='text-zinc-400 text-base'>
          {issuer} - {date}
        </h4>
        <p className='text-zinc-400 font-thin text-xs'>{skills}</p>
      </div>
    </a>
  );
}

function renderCertificates(): React.JSX.Element {
  return (
    <div className='flex flex-col mt-8'>
      <PageSubtitle text='Certificates' />
      <div className=''>
        {Certificates.map((cert, index) => (
          <CertificateCard
            key={cert.link}
            link={cert.link}
            name={cert.name}
            logoName={cert.logoName}
            issuer={cert.issuer}
            skills={cert.skills}
            date={cert.date}
          />
        ))}
      </div>
    </div>
  );
}
export default function Resume(): React.JSX.Element {
  return (
    <div className='justify-start items-start text-zinc-200'>
      <PageTitle text='Resume' />
      <div className='flex flex-col w-full'>
        {renderExperience()}
        {renderSkills()}
        {renderCertificates()}
      </div>
    </div>
  );
}
