import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { setProfile } from '@/redux/Slices/profile'
import { getCollegeProfile,addCollegeProfile } from '../requests/features'
import { routes } from '@/constants/routes'

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
  

export function * handleADDCollegeProfile (action) {
  try {
    const response = yield call(addCollegeProfile, action.payload)

    if (response.data.status == 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Profile Added Successfully'
      )

      window.history.replaceState({}, 'Placement Policy', routes.PLACEMENTPROFILE)
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
