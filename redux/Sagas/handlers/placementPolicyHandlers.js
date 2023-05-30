import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { setPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { getPlacementPolicy, addPlacementPolicy } from '../requests/features'
import { routes } from '@/constants/routes'

export function * handleGetPlacementPolicy () {
  try {
    const response = yield call(getPlacementPolicy)
    if (response.data.status === '200') {
      yield put(setPlacementPolicy(response.data.data))
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

export function * handleADDPlacementPolicy (action) {
  try {
    const response = yield call(addPlacementPolicy, action.payload)

    if (response.data.status == 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Placement Policy Added Successfully'
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
