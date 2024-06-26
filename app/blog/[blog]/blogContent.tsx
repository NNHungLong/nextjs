"use client"
import { createRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface BlogContentProps {
  post: string;
}

export default function BlogContent({ post }: BlogContentProps) {
  const syntaxHighlighterRef = createRef<SyntaxHighlighter>();

  return (
    <div className='flex flex-col'>
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
    </div>
  );
}