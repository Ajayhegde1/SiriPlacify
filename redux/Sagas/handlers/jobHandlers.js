import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setJob, updateJob } from '@/redux/Slices/jobSlice'
import { getAllJobs, addJobs } from '../requests/features'

import { routes } from '@/constants/routes'

export function * handleGetAllJobs () {
  try {
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
  } catch (error) {
    console.error(error)
    openNotification(
      notificationTypes.ERROR,
      '[500] Internal Server Error',
      'Something went wrong. Please try again later.'
    )
  }
}


export function * handleADDJob(action){
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