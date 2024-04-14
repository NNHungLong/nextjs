// cores
import React from 'react';

// server side
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

// components
import BlogContent from './blogContent';


export async function generateStaticParams() {
  const folderDirectory = path.join(process.cwd(), 'public/markdown');
  let posts = fs.readdirSync(folderDirectory);
  return Array.isArray(posts) ? posts.map((post: string) => ({
    blog: post.replace('.md', '')
  })) : [];
}

const getPost = async (blog: string) => {
  const folderDirectory = path.join(process.cwd(), 'public/markdown');
  const fileName = blog + '.md';
  const fileDirectory = path.join(folderDirectory, fileName);
  if (!fs.existsSync(fileDirectory)) return '';
  const post = await fsPromises.readFile(fileDirectory, 'utf8');
  return post;
}

export default async function Blog({ params }) {
  const post = await getPost(params?.blog || '');
  return <BlogContent post={post} />;
}
