import { createSlice } from '@reduxjs/toolkit'

const initialProfileState = null

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    setProfile: (state, action) => action.payload,
    resetProfile: () => null,
    updateProfile: (state, action) => [...state, action.payload],
    getProfile: (state) => state,
    addProfile: (state, action) => action.payload
  }
})

export const {
  setProfile,
  resetProfile,
  updateProfile,
  getProfile,
  addProfile
} = profileSlice.actions

export default profileSlice.reducer
