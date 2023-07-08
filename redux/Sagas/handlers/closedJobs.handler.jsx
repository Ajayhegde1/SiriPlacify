import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setClosedJob } from '@/redux/Slices/closedJobsSlice'
import { getClosedJobs } from '../requests/features'
import { store } from '@/redux/configureStore'

export function * handleGetClosedJobsHandler () {
  try {
    if (store.getState().user.accType === '2') {
      const response = yield call(getClosedJobs)
      if (response.data.status === 200) {
        yield put(setClosedJob(response.data.data))
      } else if (response.data.status === 401) {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Session ID is invalid or not present'
        )
      } else if (response.data.status === 423) {
        openNotification(
          notificationTypes.ERROR,
          '[404] Not Found',
          'Job ID is invalid.'
        )
      } else if (response.data.status === 500) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to close job.'
        )
      } else {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Something went wrong. Please try again later.'
        )
      }
    } else {
      openNotification(
        notificationTypes.ERROR,
        'You cannot access this data.'
      )
    }
  } catch (error) {
    console.error(error)
    openNotification(
      notificationTypes.ERROR,
      'You cannot access this data.'
    )
  }
}
