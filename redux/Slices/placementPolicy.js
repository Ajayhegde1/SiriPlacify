import { createSlice } from '@reduxjs/toolkit'

const initialPlacementPolicyState = null

const placementPolicySlice = createSlice({
  name: 'placementPolicy',
  initialState: initialPlacementPolicyState,
  reducers: {
    setPlacementPolicy: (state, action) => action.payload,
    resetPlacementPolicy: () => null,
    updatePlacementPolicy: (state, action) => [...state, action.payload],
    getPlacementPolicy: (state) => state,
    addPlacementPolicy: (state, action) => [...state, action.payload]
  }
})

export const {
  setPlacementPolicy,
  resetPlacementPolicy,
  updatePlacementPolicy,
  getPlacementPolicy,
  addPlacementPolicy
} = placementPolicySlice.actions

export default placementPolicySlice.reducer
