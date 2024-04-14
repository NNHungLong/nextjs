"use client"
import { usePathname } from 'next/navigation';
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
    path: 'mailto:ng2hunglong@gmail.com',
    icon: EnvelopeClosedIcon,
  },
];

const externalLinks = [
  {
    name: 'Linkedin',
    path: 'https://www.linkedin.com/in/long-nguy%E1%BB%85n-998743199/',
    ariaLabel: 'Learn more about the author on Linkedin',
    icon: LinkedInLogoIcon,
  },
  {
    name: 'Github',
    path: 'https://github.com/NNHungLong',
    ariaLabel: 'Learn more about the author on Github',
    icon: GitHubLogoIcon,
  },
];

function NavItemsMobile(): React.JSX.Element {
  const pathName = usePathname();
  return (
    <ul className='pt-2 flex flex-col gap-2'>
      {navItems.map((item) => (
        <li key={item?.path}>
          <div onClick={toggleMobileNavBar}>
            <Link
              href={item?.path}
              className='flex justify-center items-center'
            >
              <span
                className={`hover:text-sky-500 ${pathName === item?.path
                  ? 'font-bold text-sky-500'
                  : 'text-zinc-200'
                  }`}
              >
                {item?.name}
              </span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

function MobileNavbar(): React.JSX.Element {
  return (
    <div
      id='mobile-nav-bar'
      className='fixed z-40 translate-x-[-330px] h-screen overflow-auto w-[330px] bg-neutral-700 duration-300 ease-in-out flex flex-col gap-2 pt-8 text-white lg:hidden items-center'
    >
      {ProfileAvatar()}
      {NameAndTitle()}
      {NavItemsMobile()}
      {ExternalLinks()}
      {DownloadCV()}
    </div>
  );
}

function HamburgerIcon(): React.JSX.Element {
  return (
    <div
      id='hamburger-icon'
      className='hamburger-icon bg-sky-500 lg:hidden'
      onClick={toggleMobileNavBar}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

function ProfileAvatar(): React.JSX.Element {
  return (
    <div className='rounded-full overflow-hidden flex justify-center items-center border-2 border-white bg-white w-[180px] min-h-[180px] h-[180px]'>
      <Image
        alt='author'
        width='176'
        height='235'
        sizes='176px'
        quality={100}
        src='/images/anh3x4.webp'
      />
    </div>
  );
}

function NameAndTitle(): React.JSX.Element {
  return (
    <>
      <h4 className='font-bold text-3xl text-center mt-4'>Hùng Long</h4>
      <h5 className='text-center font-light opacity-75'>Software Engineer</h5>
    </>
  );
}

function ExternalLinks(): React.JSX.Element {
  return (
    <div className='flex justify-center items-center gap-6 mt-4'>
      {externalLinks.map((item) => (
        <a
          href={item.path}
          key={item.path}
          target='_blank'
          aria-label={item?.ariaLabel}
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
  );
}

function DownloadCV(): React.JSX.Element {
  return (
    <div className='flex justify-center items-center my-10'>
      <a
        href='/downloads/CV_Long.pdf'
        download='CV_HungLong'
        className='text-center px-4 py-2 border-2 rounded-lg border-white hover:bg-white hover:text-sky-500 transition ease-in-out duration-300 cursor-pointer'
      >
        Download CV
      </a>
    </div>
  );
}

export function toggleMobileNavBar(): void {
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileNavBar = document.getElementById('mobile-nav-bar');
  if (hamburgerIcon && mobileNavBar) {
    if (hamburgerIcon.classList.contains('active')) {
      hamburgerIcon.classList.remove('active');
      mobileNavBar.classList.add('translate-x-[-330px]');
    } else {
      hamburgerIcon.classList.add('active');
      mobileNavBar.classList.remove('translate-x-[-330px]');
    }
  }
}

export default function Navbar(): React.JSX.Element {
  const pathName = usePathname();
  return (
    <>
      <HamburgerIcon />
      <MobileNavbar />
      <div className='lg:flex hidden overflow-y-auto'>
        <nav className='w-[100px] min-h-screen bg-zinc-800'>
          <ul className='bg-zinc-800'>
            {navItems.map((item) => (
              <li
                key={item?.path}
                className={`hover:text-sky-500 border-b-[1px] py-3 border-b-zinc-700 ${pathName === item?.path ? 'text-sky-500' : 'text-zinc-200'
                  }`}
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
        <div className='bg-neutral-700 flex flex-col px-16 gap-2 pt-12 text-white'>
          {ProfileAvatar()}
          {NameAndTitle()}
          {ExternalLinks()}
          {DownloadCV()}
        </div>
      </div>
    </>
  );
}
