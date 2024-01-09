// cores
import React from 'react';

// server side
import { promises as fs } from 'fs';
import path from 'path';

// components
import Layout from '../../components/layout';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// utils

// typescript
import type { GetStaticProps, GetStaticPaths } from 'next';

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          slug: 'redux',
        },
      },
    ],
    fallback: false, // true or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const folderDirectory = path.join(process.cwd(), 'public/markdown');
  const fileName = context.params.slug + '.md';
  const fileDirectory = path.join(folderDirectory, fileName);
  const post = await fs.readFile(fileDirectory, 'utf8');
  return {
    props: {
      slug: context.params.slug,
      post,
    },
  };
}) satisfies GetStaticProps;

export default function Blog({ slug, post }) {
  return (
    <Layout>
      <Markdown remarkPlugins={[[remarkGfm]]}>{post}</Markdown>
    </Layout>
  );
}
