// cores
import React from 'react';

// components
import BlogContent from './blogContent';

// utils
import { allPosts } from 'contentlayer/generated'

export const generateMetadata = ({ params }: { params: { blog: string } }) => {
  const post = allPosts.find((post) => post.slugAsParams === params.blog);
  if (!post) {
    throw new Error(`Post not found for blog: ${params.blog}`)
  }
  return { title: post?.title }
}

export async function generateStaticParams() {
  return allPosts.map((post) => {
    return { blog: post._raw.flattenedPath }
  })
}

interface BlogParams {
  params: {
    blog: string
  }
}

export default async function Blog({ params }: BlogParams) {
  const post = allPosts.find((post) => post.slugAsParams === params.blog);
  if (!post) throw new Error(`Post not found for slug: ${params.blog}`)
  return <BlogContent post={post} />;
}
