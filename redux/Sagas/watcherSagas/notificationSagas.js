import { takeLatest } from 'redux-saga/effects'

import { handleGetNotifications, handleMarkNotifications } from '../handlers/notifications.handler'
import { getNotifications, updateNotification } from '@/redux/Slices/notificationSlice'

export function * NotificationSagas () {
  yield takeLatest(getNotifications.type, handleGetNotifications)
  yield takeLatest(updateNotification.type, handleMarkNotifications)
}
