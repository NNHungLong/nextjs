import React, { ReactNode } from 'react';

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

export default function Layout({
  className = '',
  children,
}: LayoutProps): React.JSX.Element {
  return (
    <div
      className={`bg-black w-full text-white flex flex-col justify-center items-center gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
