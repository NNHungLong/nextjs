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
      className={`lg:w-[calc(100%-408px)] w-full overflow-y-auto bg-neutral-800 min-h-screen text-zinc-200 flex flex-col items-center gap-3 ${className}`}
      onClick={collapseMobileNavBar}
    >
      {children}
    </div>
  );
}
