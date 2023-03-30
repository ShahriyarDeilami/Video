import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  email: string;
  avatarUrl: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  avatarUrl: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Record<keyof UserState, string>>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
