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

    if (response.data.status == 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Profile Added Successfully'
      )

      window.history.replaceState({}, 'Edit Company Profile', routes.EDITCOMPANYPROFILE)
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
