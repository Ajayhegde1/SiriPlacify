import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { handleErrorResponse } from '@/utils/errorMessage'

import { setJob, updateJob } from '@/redux/Slices/jobSlice'
import { setClosedJobForCollege } from '@/redux/Slices/closedJobsCollegeSlice'
import { getAllJobs, getCompanyJobs, addJobsByCompany, addJobs, uploadJobDescFile } from '../requests/features'
import { store } from '@/redux/configureStore'

import { routes } from '@/constants/routes'

export function * handleGetAllJobs () {
  try {
    if (store.getState().user.accType === '0') {
      const response = yield call(getAllJobs)
      if (response.data.status === 200) {
        yield put(setJob(response.data.data))
      } 
      else {
        handleErrorResponse(response);
      }
    } else if (store.getState().user.accType === '1') {
      const response = yield call(getAllJobs)
      if (response.data.status === 200) {
        const openJobs = response.data.data.filter((job) => job.isClosed === false)
        const closedJobs = response.data.data.filter((job) => job.isClosed === true)
        yield put(setClosedJobForCollege(closedJobs))
        yield put(setJob(openJobs))
      } 
      else {
        handleErrorResponse(response);
      }
    } else if (store.getState().user.accType === '2') {
      const response = yield call(getCompanyJobs)
      if (response.data.status === 200) {
        yield put(setJob(response.data.data))
      } 
      else {
        handleErrorResponse(response);
      }
    } else {
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
    const response = yield call(addJobs, action.payload.data)

    if (response.data.status === 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Job Added Successfully'
      )

      if (action.payload.file) {
        uploadJobDescFile(action.payload.file.name, response.data.data.uid)
          .then((res) => {
            const url = res.data.url

            axios.put(url, action.payload.file, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then((res) => {
                window.history.replaceState({}, 'Jobs', routes.JOBS)
                window.location.reload()
              })
              .catch((err) => {
                console.log(err)
                openNotification('error', 'Error uploading file')
              })
          })
          .catch((err) => {
            console.log(err)
          })

        yield put(updateJob(response.data.data))
      } else {
        window.history.replaceState({}, 'Jobs', routes.JOBS)
        window.location.reload()
      }
    } else if (response.data.status === 401) {
      openNotification(
        notificationTypes.WARNING,
        'Session ID is invalid or not present'
      )
    } else if (response.data.status === 423) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Unable to retrieve college.'
      )
    } else if (response.data.status === 424) {
      openNotification(
        notificationTypes.WARNING,
        'Body is undefined'
      )
    } else if (response.data.status === 425) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Some attributes of data sent is undefined.'
      )
    } else if (response.data.status === 426) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Some attributes of data sent is null.'
      )
    } else if (response.data.status === 427) {
      openNotification(
        notificationTypes.ERROR,
        '[500] Internal Server Error',
        'Some attributes of data sent is blank.'
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
    const response = yield call(addJobsByCompany, action.payload.data)

    if (response.data.status === 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Job Added Successfully'
      )

      if (action.payload.file) {
        uploadJobDescFile(action.payload.file.name, response.data.data.uid)
          .then((res) => {
            const url = res.data.url
            axios.put(url, action.payload.file, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then((res) => {
                window.history.replaceState({}, 'Jobs', routes.JOBS)
                window.location.reload()
              })
              .catch((err) => {
                console.log(err)
                openNotification('error', 'Error uploading resume')
              })
          })
          .catch((err) => {
            console.log(err)
          })
      }

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
