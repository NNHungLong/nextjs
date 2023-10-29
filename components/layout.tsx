import React, { ReactNode } from 'react';

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
    <div
      className={`bg-black w-full min-h-screen text-white flex flex-col justify-center items-center gap-3 ${className}`}
      onClick={collapseMobileNavBar}
    >
      {children}
    </div>
  );
}
