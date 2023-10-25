import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  PersonIcon,
  IdCardIcon,
  BackpackIcon,
  Pencil2Icon,
  EnvelopeClosedIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'About Me',
    path: '/about',
    icon: PersonIcon,
  },
  {
    name: 'Resume',
    path: '/resume',
    icon: IdCardIcon,
  },
  {
    name: 'Portfolio',
    path: '/portfolio',
    icon: BackpackIcon,
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: Pencil2Icon,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: EnvelopeClosedIcon,
  },
];

const externalLinks = [
  {
    name: 'Linkedin',
    path: 'https://www.linkedin.com/in/long-nguy%E1%BB%85n-998743199/',
    icon: LinkedInLogoIcon,
  },
  {
    name: 'Github',
    path: 'https://github.com/NNHungLong',
    icon: GitHubLogoIcon,
  },
];

export default function Navbar() {
  return (
    <div className='flex bg-orange'>
      <nav className='w-[100px] min-h-screen bg-zinc-800'>
        <ul>
          {navItems.map((item) => (
            <li
              key={item?.path}
              className='text-zinc-200 hover:text-sky-500 border-b-[1px] py-3 border-b-zinc-700'
            >
              <Link
                href={item?.path}
                className='flex flex-col items-center gap-1'
              >
                <item.icon width={30} height={30} />
                <span className='text-zinc-200 text-sm'>{item?.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='bg-neutral-600 flex flex-col px-16 gap-2 pt-12 text-white'>
        <div className='rounded-full overflow-hidden flex justify-center items-center border-2 border-white bg-white w-[180px] h-[180px]'>
          <Image
            src='/images/anh3x4.jpg'
            width={180}
            height={180}
            alt='author'
          />
        </div>
        <h4 className='font-bold text-3xl text-center mt-4'>Hùng Long</h4>
        <h5 className='text-center font-light opacity-75'>Software Engineer</h5>
        <div className='flex justify-center items-center gap-6 mt-4'>
          {externalLinks.map((item) => (
            <a
              href={item.path}
              key={item.path}
              target='_blank'
              rel='noreferrer'
              className='text-white'
            >
              <item.icon
                width={30}
                height={30}
                className='hover:text-sky-500 duration-300 ease-in-out'
              />
            </a>
          ))}
        </div>
        <div className='flex justify-center items-center my-10'>
          <h4 className='text-center px-4 py-2 border-2 rounded-lg border-white hover:bg-white hover:text-sky-500 transition ease-in-out duration-300 cursor-pointer'>
            Download CV
          </h4>
        </div>
      </div>
    </div>
  );
}
