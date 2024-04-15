import { Post } from '@/.contentlayer/generated';
import { format, parseISO } from 'date-fns'

interface BlogContentProps {
  post: Post;
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <div className='flex flex-col'>
      <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  );
}