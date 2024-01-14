import Layout from '../../components/layout';
import React from 'react';
import Link from 'next/link';

export default function Blog() {
  return (
    <Layout>
      <Link href='blog/redux'>Redux</Link>
      <Link href='blog/react-basic'>React Basic</Link>
    </Layout>
  );
}
