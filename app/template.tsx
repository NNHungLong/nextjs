'use client'
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

function collapseMobileNavBar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  e.preventDefault();
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileNavBar = document.getElementById('mobile-nav-bar');
  if (hamburgerIcon && mobileNavBar) {
    if (hamburgerIcon.classList.contains('active')) {
      hamburgerIcon.classList.remove('active');
      mobileNavBar.classList.add('translate-x-[-330px]');
    }
  }
}

export default function Template({ className, children }: LayoutProps) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
      }}
      className={`lg:w-[calc(100%-408px)] w-full h-screen overflow-y-auto bg-neutral-800 text-zinc-200 flex flex-col gap-3 pl-14 py-7 pr-7 ${className} absolute right-0`}
      onClick={collapseMobileNavBar}
    >
      {children}
    </motion.div>
  );
}