import { createSlice } from '@reduxjs/toolkit'

const initialDeclinedJobState = null

const declinedJobSlice = createSlice({
  name: 'job',
  initialState: initialDeclinedJobState,
  reducers: {
    setDeclinedJob: (state, action) => action.payload,
    resetDeclinedJob: () => null,
    updateDeclinedJob: (state, action) => [...state, action.payload],
    getDeclinedJob: (state) => state,
    addDeclinedJob: (state, action) => state
  }
})

export const {
  setDeclinedJob,
  resetDeclinedJob,
  updateDeclinedJob,
  getDeclinedJob,
  addDeclinedJob
} = declinedJobSlice.actions

export default declinedJobSlice.reducer
