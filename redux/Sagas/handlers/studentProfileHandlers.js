import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { setStudentProfile } from '@/redux/Slices/studentSlice'
import { getStudentProfile, addStudentProfile } from '../requests/features'
import { routes } from '@/constants/routes'

export function * handleGetStudentProfile () {
  try {
    const response = yield call(getStudentProfile)
    if (response.data.status === 200) {
      yield put(setStudentProfile(response.data.data))
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

export function * handleADDStudentProfile (action) {
  try {
    const response = yield call(addStudentProfile, action.payload)

    if (response.data.status == 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Profile Added Successfully'
      )

      window.history.replaceState({}, 'Jobs', routes.JOBS)
      window.location.reload()
    } else if (response.data.status == 466) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Space found in url or domain'
      )
    } else if (response.data.status === 400) {
      openNotification(
        notificationTypes.WARNING,
        'Cannot Submit data'
      )
    } else if (response.data.status === 500) {
      openNotification(
        notificationTypes.ERROR,
        response.data.msg,
        'Please enter a valid data.'
      )
    } else {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Please try again later.'
      )
    }
  } catch (err) {
    console.error(err)
  }
}
