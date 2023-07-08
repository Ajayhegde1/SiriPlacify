import { createSlice } from '@reduxjs/toolkit'

const initialClosedJobState = null

const closedJobSlice = createSlice({
  name: 'closedJob',
  initialState: initialClosedJobState,
  reducers: {
    setClosedJob: (state, action) => action.payload,
    resetClosedJob: () => null,
    updateClosedJob: (state, action) => [...state, action.payload],
    getClosedJob: (state) => state,
    addClosedJob: (state, action) => state
  }
})

export const {
  setClosedJob,
  resetClosedJob,
  updateClosedJob,
  getClosedJob,
  addClosedJob
} = closedJobSlice.actions

export default closedJobSlice.reducer
