import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './features/github/services';
import appSlice from './features/app/appSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appSlice,
      [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(githubApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];