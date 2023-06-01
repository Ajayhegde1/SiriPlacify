import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setJob, updateJob } from '@/redux/Slices/jobSlice'
import { getAllJobs, getStudentJobs, getCompanyJobs, addJobsByCompany } from '../requests/features'
import { store } from '@/redux/configureStore'

import { routes } from '@/constants/routes'

export function * handleGetAllJobs () {
  try {
    if (store.getState().user.accType === '0') {
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
    } else if (store.getState().user.accType === '1') {
      const response = yield call(getStudentJobs)
      if (response.data.status === '200') {
        yield put(setJob(response.data.data))
      } else {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Something went wrong. Please try again later.'
        )
      }
    } 
    else if (store.getState().user.accType === '2') {
      const response = yield call(getCompanyJobs)
      if (response.data.status === '200') {
        yield put(setJob(response.data.data))
      } else {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Something went wrong. Please try again later.'
        )
      }
    }
    else {
      openNotification(
        notificationTypes.ERROR,
        'account type not found'
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

export function * handleADDJob (action) {
  try {
    const response = yield call(addJobs, action.payload)

    if (response.data.status == 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Job Added Successfully'
      )

      yield put(updateJob(response.data.data))

      window.history.replaceState({}, 'Jobs', routes.JOBS)
      window.location.reload()
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

export function * handleADDJobByCompany (action) {
  try {
    const response = yield call(addJobsByCompany, action.payload)

    if (response.data.status == 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Job Added Successfully'
      )

      window.location.reload()
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
