import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setJob, updateJob } from '@/redux/Slices/jobSlice'
import { getAllJobs, getStudentJobs, getCompanyJobs, addJobsByCompany, addJobs } from '../requests/features'
import { store } from '@/redux/configureStore'

import { routes } from '@/constants/routes'

export function * handleGetAllJobs () {
  try {
    if (store.getState().user.accType === '0') {
      const response = yield call(getAllJobs)
      if (response.data.status === 200) {
        yield put(setJob(response.data.data))
      } else if (response.data.status === 401) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Session ID is invalid or not present.'
        )
      } else if (response.data.status === 423) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve college.'
        )
      } else if (response.data.status === 424) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve jobs.'
        )
      } else if (response.data.status === 425) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid job type.'
        )
      } else if (response.data.status === 426) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve company.'
        )
      } else if (response.data.status === 427) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid User Type.'
        )
      } else if (response.data.status === 500) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve Job Sucessfully.'
        )
      } else {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Something went wrong. Please try again later.'
        )
      }
    } else if (store.getState().user.accType === '1') {
      const response = yield call(getStudentJobs)
      if (response.data.status === 200) {
        yield put(setJob(response.data.data))
      } else if (response.data.status === 401) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Session ID is invalid or not present.'
        )
      } else if (response.data.status === 423) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve college.'
        )
      } else if (response.data.status === 424) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve jobs.'
        )
      } else if (response.data.status === 425) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid job type.'
        )
      } else if (response.data.status === 426) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve company.'
        )
      } else if (response.data.status === 427) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid User Type.'
        )
      } else if (response.data.status === 500) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve Job Sucessfully.'
        )
      } else {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Something went wrong. Please try again later.'
        )
      }
    } else if (store.getState().user.accType === '2') {
      const response = yield call(getCompanyJobs)
      if (response.data.status === 200) {
        yield put(setJob(response.data.data))
      } else if (response.data.status === 401) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Session ID is invalid or not present.'
        )
      } else if (response.data.status === 423) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve college.'
        )
      } else if (response.data.status === 424) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve jobs.'
        )
      } else if (response.data.status === 425) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid job type.'
        )
      } else if (response.data.status === 426) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve company.'
        )
      } else if (response.data.status === 427) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Invalid User Type.'
        )
      } else if (response.data.status === 500) {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Unable to retrieve Job Sucessfully.'
        )
      } else {
        openNotification(
          notificationTypes.ERROR,
          '[500] Internal Server Error',
          'Something went wrong. Please try again later.'
        )
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
    const response = yield call(addJobs, action.payload)

    if (response.data.status === 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Job Added Successfully'
      )

      yield put(updateJob(response.data.data))

      window.history.replaceState({}, 'Jobs', routes.JOBS)
      window.location.reload()
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
    const response = yield call(addJobsByCompany, action.payload)

    if (response.data.status === 200) {
      openNotification(
        notificationTypes.SUCCESS,
        'Job Added Successfully'
      )
      
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
