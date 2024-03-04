// cores
import React from 'react';

// server side
import { promises as fs } from 'fs';
import path from 'path';

// components
import Layout from '../../components/layout';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
      {
        params: {
          slug: 'react-basic',
        },
      },
      {
        params: {
          slug: 'react-component-lifecycle',
        },
      },
      {
        params: {
          slug: 'server-side-rendering',
        },
      },
      {
        params: {
          slug: 'react-ref',
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
  const syntaxHighlighterRef = React.createRef<SyntaxHighlighter>();
  return (
    <Layout>
      <Markdown
        className='markdown-body'
        remarkPlugins={[[remarkGfm]]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag='div'
                language={match[1]}
                style={coldarkDark}
                ref={syntaxHighlighterRef}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {post}
      </Markdown>
    </Layout>
  );
}
