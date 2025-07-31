'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useGetReadmeQuery } from '@/store/features/github/services';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';

interface ReadmeDisplayProps {
  owner: string;
  repo: string;
}

const ReadmeDisplay: React.FC<ReadmeDisplayProps> = ({ owner, repo }) => {
  const { theme } = useTheme();
  const {
    data: readme,
    error,
    isLoading,
    isFetching,
  } = useGetReadmeQuery(
    { owner, repo },
    {
      skip: !owner || !repo,
    }
  );

  if (isLoading || isFetching) {
    return (
      <>
        <CardHeader>
          <Skeleton className='h-7 w-1/2' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </CardContent>
      </>
    );
  }

  if (error || !readme) {
    return (
      <>
        <CardHeader>
          <CardTitle>{repo}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>Could not load README.md. The repository might be private or the file may not exist.</p>
        </CardContent>
      </>
    );
  }

  // Decode base64 content
  const content = Buffer.from(readme.content, 'base64').toString('utf-8');

  return (
    <>
      <CardHeader>
        <CardTitle>README.md for {repo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='markdown-body' data-color-mode={theme === 'dark' ? 'dark' : 'light'}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </>
  );
};

export default ReadmeDisplay;
