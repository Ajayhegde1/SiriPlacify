import { takeLatest } from 'redux-saga/effects'

import { handleGetNotifications } from '../handlers/notifications.handler'
import { getNotifications } from '@/redux/Slices/notificationSlice'

export function * NotificationSagas () {
    yield takeLatest(getNotifications.type, handleGetNotifications)
  } 