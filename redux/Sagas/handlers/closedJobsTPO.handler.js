import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setClosedJobForCollege } from '@/redux/Slices/closedJobsCollegeSlice'
import { getClosed } from '../requests/features'
import { store } from '@/redux/configureStore'

export function * handleGetClosedJobsCollegeHandler () {
  try {
    if (store.getState().user.accType !== '2') {
      const response = yield call(getClosed)
      if (response.data.status === 200) {
        yield put(setClosedJobForCollege(response.data.data))
      } else if (response.data.status === 401) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Session ID is invalid or not present.'
        )
      } else if (response.data.status === 423) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve college.'
        )
      } else if (response.data.status === 424) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve jobs.'
        )
      } else if (response.data.status === 425) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid job type.'
        )
      } else if (response.data.status === 426) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve company.'
        )
      } else if (response.data.status === 427) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid User Type.'
        )
      } else if (response.data.status === 500) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve Job Sucessfully.'
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
