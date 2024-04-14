// components
import Navbar from '@/components/navbar';

// utils
import 'styles/globals.css';
import 'styles/markdown.css';

export const metadata = {
  title: 'Hung Long portfolio',
  description: 'Software engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className='flex bg-neutral-700 w-screen h-screen overflow-hidden'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
