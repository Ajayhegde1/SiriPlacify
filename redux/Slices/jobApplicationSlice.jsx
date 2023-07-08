import { createSlice } from '@reduxjs/toolkit'

const initialJobApplicationState = null

const jobApplicationSlice = createSlice({
  name: 'jobApplication',
  initialState: initialJobApplicationState,
  reducers: {
    setJobApplication: (state, action) => action.payload,
    resetJobApplication: () => null,
    updateJobApplication: (state, action) => [...state, action.payload],
    getJobApplication: (state) => state,
    addJobApplication: (state, action) => state
  }
})

export const {
  setJobApplication,
  resetJobApplication,
  updateJobApplication,
  getJobApplication,
  addJobApplication
} = jobApplicationSlice.actions

export default jobApplicationSlice.reducer
