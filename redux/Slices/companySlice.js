import { createSlice } from '@reduxjs/toolkit'

const initialCompanyProfileState = null

const companyProfileSlice = createSlice({
  name: 'companyProfile',
  initialState: initialCompanyProfileState,
  reducers: {
    setCompanyProfile: (state, action) => action.payload,
    resetCompanyProfile: () => null,
    updateCompanyProfile: (state, action) => [...state, action.payload],
    getCompanyProfile: (state) => state,
    addCompanyProfile: (state, action) => action.payload
  }
})

export const {
  setCompanyProfile,
  resetCompanyProfile,
  updateCompanyProfile,
  getCompanyProfile,
  addCompanyProfile
} = companyProfileSlice.actions

export default companyProfileSlice.reducer
