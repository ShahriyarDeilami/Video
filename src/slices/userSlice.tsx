import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  avatarUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Record<keyof UserState, string>>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
