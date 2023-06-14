import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { setPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { getPlacementPolicy, addPlacementPolicy } from '../requests/features'
import { routes } from '@/constants/routes'

export function * handleGetPlacementPolicy () {
  try {
    const response = yield call(getPlacementPolicy)
    if (response.data.status === 200) {
      yield put(setPlacementPolicy(response.data.data))
    } else if (response.data.status === 401) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Session ID is invalid or not present'
      )
    } else if (response.data.status === 424) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'unable to get college ID.'
      )
    } else if (response.data.status === 500) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'unable to retrieve placement policy.'
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

export function * handleADDPlacementPolicy (action) {
  try {
    const response = yield call(addPlacementPolicy, action.payload)

    if (response.data.status === 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Placement Policy Added Successfully'
      )

      window.history.replaceState({}, 'Dashboard', routes.TPODASHBOARD)
      window.location.reload()
    } else if (response.data.status === 401) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Session ID is invalid or not present'
      )
    } else if (response.data.status === 425) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Request Body is undefined'
      )
    } else if (response.data.status === 424) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'unable to get college ID.'
      )
    } else if (response.data.status === 426) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'some of the attributes are undefined'
      )
    } else if (response.data.status === 427) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Some attributes is null'
      )
    } else if (response.data.status === 500) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Error in adding Placement Policy.'
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
