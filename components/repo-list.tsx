'use client';

import React from 'react';
import { useGetReposByUsernameQuery, Repo } from '@/store/features/github/services';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface RepoListProps {
  username: string;
  selectedRepo: string | null;
  onSelectRepo: (repoName: string) => void;
}

const RepoList: React.FC<RepoListProps> = ({ username, selectedRepo, onSelectRepo }) => {
  const {
    data: repos,
    error,
    isLoading,
    isFetching,
  } = useGetReposByUsernameQuery(username, {
    skip: !username,
  });

  if (isLoading || isFetching) {
    return (
      <div className='space-y-4'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='space-y-2'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    if ('status' in error && error.status === 404) {
      return <p className='text-destructive text-center p-4'>User not found.</p>;
    }
    return <p className='text-destructive text-center p-4'>Error fetching repositories.</p>;
  }

  if (!repos || repos.length === 0) {
    return <p className='text-muted-foreground text-center p-4'>No public repositories found.</p>;
  }

  return (
    <ScrollArea className='h-[calc(60vh)]'>
      <div className='space-y-1 pr-4'>
        {repos.map((repo: Repo) => (
          <button
            key={repo.id}
            className={cn('w-full text-left p-3 rounded-md transition-colors', 'hover:bg-accent hover:text-accent-foreground', selectedRepo === repo.name ? 'bg-muted font-semibold' : '')}
            onClick={() => onSelectRepo(repo.name)}
          >
            <h3 className='text-sm font-medium leading-none'>{repo.name}</h3>
            <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>{repo.description || 'No description'}</p>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RepoList;
