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

const Logos = {
  Docker: DockerLogo,
  Jquery: JqueryLogo,
  MongoDB: MongoDBLogo,
  MySQL: MysqlLogo,
  'Next.js': NextJsLogo,
  PHP: PHPLogo,
  'React Native': ReactNativeLogo,
  Remix: RemixLogo,
  'Tailwind CSS': TailwindCssLogo,
  WordPress: WordpressLogo,
  FreeCodeCamp: FreeCodeCampWhite,
};

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
  return Logos[name] ? (
    <Image
      src={Logos[name].src}
      alt={name}
      {...props}
      width={width}
      height={height}
    />
  ) : null;
}
