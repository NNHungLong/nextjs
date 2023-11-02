import React from 'react';
import DockerLogo from '../public/images/logo/docker.png';
import JqueryLogo from '../public/images/logo/jquery.png';
import MongoDBLogo from '../public/images/logo/mongodb.png';
import MysqlLogo from '../public/images/logo/mysql.png';
import NextJsLogo from '../public/images/logo/nextjs.png';
import PHPLogo from '../public/images/logo/php.png';
import ReactNativeLogo from '../public/images/logo/react-native.png';
import RemixLogo from '../public/images/logo/remix.webp';
import TailwindCssLogo from '../public/images/logo/tailwindcss.png';
import WordpressLogo from '../public/images/logo/wordpress.png';
import FreeCodeCampWhite from '../public/images/logo/free_code_camp_white.svg';
import Image from 'next/image';

const Logos = [
  {
    component: DockerLogo,
    name: 'Docker',
  },
  {
    component: JqueryLogo,
    name: 'Jquery',
  },
  {
    component: MongoDBLogo,
    name: 'MongoDB',
  },
  {
    component: MysqlLogo,
    name: 'MySQL',
  },
  {
    component: NextJsLogo,
    name: 'Next.js',
  },
  {
    component: PHPLogo,
    name: 'PHP',
  },
  {
    component: ReactNativeLogo,
    name: 'React Native',
  },
  {
    component: RemixLogo,
    name: 'Remix',
  },
  {
    component: TailwindCssLogo,
    name: 'Tailwind CSS',
  },
  {
    component: WordpressLogo,
    name: 'WordPress',
  },
  {
    component: FreeCodeCampWhite,
    name: 'FreeCodeCamp',
  },
];
export { Logos };

interface Props {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  name,
  width = 200,
  height = 100,
  className = '',
  ...props
}: Props): JSX.Element | null {
  const logo = Logos.find((logo) => logo.name === name);
  return logo ? (
    <Image
      src={logo.component.src}
      alt={logo.name}
      {...props}
      width={width}
      height={height}
    />
  ) : null;
}
