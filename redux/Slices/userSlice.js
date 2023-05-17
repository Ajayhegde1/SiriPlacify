import { createSlice } from '@reduxjs/toolkit';

const initialUserState = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    signUp: (state) => state,
    signIn: (state) => state,
    signOut: () => initialUserState,
    setUser: (state, action) => action.payload,
  },
});

export const { signUp, signIn, signOut, setUser } = userSlice.actions;

export default userSlice.reducer;
