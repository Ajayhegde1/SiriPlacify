import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setJob } from '@/redux/Slices/jobSlice'
import { getAllJobs } from '../requests/features'

export function * handleGetAllJobs () {
  try {
    const response = yield call(getAllJobs)
    if (response.data.status === '200') {
      yield put(setJob(response.data.data))
    } else {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Something went wrong. Please try again later.'
      )
    }
  } catch (error) {
    console.error(error)
    openNotification(
      notificationTypes.ERROR,
      '[500] Internal Server Error',
      'Something went wrong. Please try again later.'
    )
  }
}
