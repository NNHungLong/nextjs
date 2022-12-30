import { Html, Head, Main, NextScript } from 'next/document';
import Header from '../src/components/header';
import Footer from '../src/components/footer';

export default function Document() {
  return (
    <Html lang="en">
      <Header />
      <body>
        <Main />
        <NextScript />
      </body>
      <Footer />
    </Html>
  )
}
