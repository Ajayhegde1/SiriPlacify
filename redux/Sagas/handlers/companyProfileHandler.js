import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { setCompanyProfile } from '@/redux/Slices/companySlice'
import { getCompany, addCompany } from '../requests/features'
import { routes } from '@/constants/routes'

export function * handleGetCompanyProfile () {
  try {
    const response = yield call(getCompany)
    if (response.data.status === 200) {
      yield put(setCompanyProfile(response.data.data))
    } else if (response.data.status === 401) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Session ID is invalid or not present'
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

export function * handleADDCompanyProfile (action) {
  try {
    const response = yield call(addCompany, action.payload)

    if (response.data.status === 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Profile Added Successfully'
      )

      window.history.replaceState({}, 'Edit Company Profile', routes.EDITCOMPANYPROFILE)
      window.location.reload()
    } else if (response.data.status === 401) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Session ID is invalid or not present'
      )
    } else if (response.data.status === 425) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Request Body is undefined'
      )
    } else if (response.data.status === 426) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Some attributes is undefined'
      )
    } else if (response.data.status === 427) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Some attributes is null'
      )
    } else if (response.data.status === 428) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Some attributes are empty'
      )
    } else if (response.data.status === 500) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Some error occured while adding company'
      )
    }
  } catch (err) {
    console.error(err)
  }
}
