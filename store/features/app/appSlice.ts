import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  username: string;
  selectedRepo: string | null;
}

const initialState: AppState = {
  username: 'aulia-s', // Default username
  selectedRepo: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.selectedRepo = null; // Reset selected repo when username changes
    },
    setSelectedRepo: (state, action: PayloadAction<string | null>) => {
      state.selectedRepo = action.payload;
    },
  },
});

export const { setUsername, setSelectedRepo } = appSlice.actions;
export default appSlice.reducer;
