import React from 'react';
import Link from 'next/link';

import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import BlogSearch from '@/components/blogSearch';

function PostCard(post: Post) {
  return (
    <span>
      <Link href={post.url} className="text-zinc-200 hover:text-sky-500 dark:text-blue-400">
        {post.title}
      </Link>
      <time dateTime={post.date} className="mb-2 block text-xs text-zinc-400">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </span>
  )
}

export default async function Blog() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  return (
    <div className='flex flex-col'>
      <BlogSearch />
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
