import { call, put } from 'redux-saga/effects'

import {
    notificationTypes,
    openNotification
  } from '@/utils/notifications'

import { getJobs, addJob } from '../requests/features'
import { setJob, updateJob } from '@/redux/ducks/jobDuck'

export function * getJobData (action) {
    console.log('getJobData')
    /* try {
      const response = yield call(getJobs)
      if (response.data.status === '200') {
        console.log(response.data.data)
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
    } */
  }

  export function * addJobsHandler (action) {
    try {
      const response = yield call(addJob, action.payload)
  
      if (response.data.status == 200) {
        openNotification(
          notificationTypes.SUCCESS,
          'Application Added Successfully'
        )
        action.payload = response.data.data
    
        yield put(updateJob(action.payload))
  
        setTimeout(() => {
          // window.location.reload()
        }, 200)
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
  