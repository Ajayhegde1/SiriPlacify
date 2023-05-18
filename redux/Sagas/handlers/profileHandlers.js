import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { setProfile } from '@/redux/Slices/profile'
import { getCollegeProfile } from '../requests/features'

export function * handleGetCollegeProfile () {
    try {
      const response = yield call(getCollegeProfile)
      if (response.data.status === '200') {
        yield put(setProfile(response.data.data))
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
  