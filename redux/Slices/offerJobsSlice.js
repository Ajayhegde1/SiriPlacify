import { createSlice } from '@reduxjs/toolkit'

const initialOfferJobState = null

const offerJobSlice = createSlice({
  name: 'job',
  initialState: initialOfferJobState,
  reducers: {
    setOfferJob: (state, action) => action.payload,
    resetOfferJob: () => null,
    updateOfferJob: (state, action) => [...state, action.payload],
    getOfferJob: (state) => state,
    addOfferJob: (state, action) => state
  }
})

export const {
  setOfferJob,
  resetOfferJob,
  updateOfferJob,
  getOfferJob,
  addOfferJob
} = offerJobSlice.actions

export default offerJobSlice.reducer
