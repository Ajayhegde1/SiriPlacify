import { createSlice } from '@reduxjs/toolkit'

const initialProfileState = null

const studentProfileSlice = createSlice({
  name: 'studentProfile',
  initialState: initialProfileState,
  reducers: {
    setStudentProfile: (state, action) => action.payload,
    resetStudentProfile: () => null,
    updateStudentProfile: (state, action) => [...state, action.payload],
    getStudentProfile: (state) => state,
    addStudentProfile: (state, action) => action.payload
  }
})

export const {
  setStudentProfile,
  resetStudentProfile,
  updateStudentProfile,
  getStudentProfile,
  addStudentProfile
} = studentProfileSlice.actions

export default studentProfileSlice.reducer
