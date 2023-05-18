import { createSlice } from '@reduxjs/toolkit';

const initialJobState = null;

const jobSlice = createSlice({
  name: 'job',
  initialState: initialJobState,
  reducers: {
    setJob: (state, action) => action.payload,
    resetJob: () => null,
    updateJob: (state, action) => [...state, action.payload],
    getJobs: (state) => state,
    addJob: (state, action) => [...state, action.payload],
  },
});

export const {
  setJob,
  resetJob,
  updateJob,
  getJobs,
  addJob,
} = jobSlice.actions;

export default jobSlice.reducer;
