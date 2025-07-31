import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a type for the repository data
export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
  };
}

// Define a type for the README data
export interface Readme {
  content: string; // Base64 encoded
  encoding: string;
  download_url: string;
}

// Create our API slice
export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getReposByUsername: builder.query<Repo[], string>({
      query: (username) => `users/${username}/repos?sort=updated`,
    }),
    getReadme: builder.query<Readme, { owner: string; repo: string; }>({
      query: ({ owner, repo }) => `repos/${owner}/${repo}/readme`,
    }),
  }),
});

// Export hooks for usage in components
export const { useGetReposByUsernameQuery, useGetReadmeQuery } = githubApi;
