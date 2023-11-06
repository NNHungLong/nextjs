import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

function collapseMobileNavBar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  e.preventDefault();
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileNavBar = document.getElementById('mobile-nav-bar');
  if (hamburgerIcon.classList.contains('active')) {
    hamburgerIcon.classList.remove('active');
    mobileNavBar.classList.add('translate-x-[-330px]');
  }
}

export default function Layout({
  className = '',
  children,
}: LayoutProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
      }}
      className={`lg:w-[calc(100%-408px)] w-full overflow-y-auto bg-neutral-800 min-h-screen text-zinc-200 flex flex-col gap-3 pl-14 py-7 pr-7 ${className}`}
      onClick={collapseMobileNavBar}
    >
      {children}
    </motion.div>
  );
}
