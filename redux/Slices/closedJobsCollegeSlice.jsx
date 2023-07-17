import { createSlice } from '@reduxjs/toolkit'

const initialClosedJobStateForCollege = null

const closedJobSliceForCollege = createSlice({
  name: 'closedJobCollege',
  initialState: initialClosedJobStateForCollege,
  reducers: {
    setClosedJobForCollege: (state, action) => action.payload,
    resetClosedJobForCollege: () => null,
    updateClosedJobForCollege: (state, action) => [...state, action.payload],
    getClosedJobForCollege: (state) => state,
    addClosedJobForCollege: (state, action) => state
  }
})

export const {
  setClosedJobForCollege,
  resetClosedJobForCollege,
  updateClosedJobForCollege,
  getClosedJobForCollege,
  addClosedJobForCollege
} = closedJobSliceForCollege.actions

export default closedJobSliceForCollege.reducer
