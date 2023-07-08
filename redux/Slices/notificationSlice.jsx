import { createSlice } from '@reduxjs/toolkit'

const initialNotificationState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setNotification: (state, action) => action.payload,
    resetNotification: () => null,
    updateNotification: (state, action) => [...state, action.payload],
    getNotifications: (state) => state,
    addNotification: (state, action) => state
  }
})

export const {
  setNotification,
  resetNotification,
  updateNotification,
  getNotifications,
  addNotification
} = notificationSlice.actions

export default notificationSlice.reducer
