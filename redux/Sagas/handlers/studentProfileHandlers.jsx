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
    } else if (response.data.status === 401) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Session ID is invalid or not present.'
      )
    } else if (response.data.status === 500) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Some error occured while getting profile.'
      )
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

    if (response.data.status === 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Profile Added Successfully'
      )

      window.history.replaceState({}, 'Student Profile', routes.UPLOADSTUDENTRESUME)
      window.location.reload()
    } else if (response.data.status === 401) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Session ID is invalid or not present'
      )
    } else if (response.data.status === 425) {
      openNotification(
        notificationTypes.WARNING,
        'Request Body is undefined.'
      )
    } else if (response.data.status === 426) {
      openNotification(
        notificationTypes.WARNING,
        'Some attributes is undefined.'
      )
    } else if (response.data.status === 427) {
      openNotification(
        notificationTypes.WARNING,
        'Some attributes is null.'
      )
    } else if (response.data.status === 428) {
      openNotification(
        notificationTypes.WARNING,
        'Some attributes are empty.'
      )
    } else if (response.data.status === 500) {
      openNotification(
        notificationTypes.ERROR,
        response.data.msg,
        'Some error occured while adding profile.'
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
    openNotification(
      notificationTypes.ERROR,
      '[500] Internal Server Error',
      'Please try again later.'
    )
  }
}
