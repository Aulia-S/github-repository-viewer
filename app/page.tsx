'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setUsername, setSelectedRepo } from '@/store/features/app/appSlice';
import RepoList from '@/components/repo-list';
import ReadmeDisplay from '@/components/readme-display';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Search } from 'lucide-react';
import ThemeSwitcher from '@/components/layout/theme-switcher';

const formSchema = z.object({
  username: z.string().min(1, { message: 'GitHub username is required.' }),
});

export default function Home() {
  const dispatch = useDispatch();
  const { username, selectedRepo } = useSelector((state: RootState) => state.app);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.username.trim()) {
      dispatch(setUsername(values.username.trim()));
    }
  }

  return (
    <main className='container mx-auto py-8 px-4'>
      <Card className='mb-8 pb-20'>
        <CardHeader className='relative'>
          <div className='flex justify-end'>
            <ThemeSwitcher />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>GitHub Repository Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full max-w-lg mx-auto items-start space-x-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='sr-only'>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter a GitHub username (e.g., vercel)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={form.formState.isSubmitting}>
                <Search className='mr-2 h-4 w-4' /> Search
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className='grid md:grid-cols-[380px_1fr] gap-8 items-start'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Repositories for "{username}"</CardTitle>
          </CardHeader>
          <CardContent>
            <RepoList username={username} selectedRepo={selectedRepo} onSelectRepo={(repoName) => dispatch(setSelectedRepo(repoName))} />
          </CardContent>
        </Card>

        <Card className='min-h-[60vh]'>
          {selectedRepo ? (
            <ReadmeDisplay owner={username} repo={selectedRepo} />
          ) : (
            <CardContent className='h-full flex items-center justify-center'>
              <div className='text-center text-muted-foreground'>
                <p>Select a repository to view its README.md</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </main>
  );
}
