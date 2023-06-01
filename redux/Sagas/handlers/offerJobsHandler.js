import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setOfferJob } from '@/redux/Slices/offerJobsSlice'
import { getOfferJobs } from '../requests/features'
import { store } from '@/redux/configureStore'

export function * handleGetOfferJobsHandler () {
    try {
      if (store.getState().user.accType === '0') {
        const response = yield call(getOfferJobs)
        if (response.data.status === '200') {
          yield put(setOfferJob(response.data.data))
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
          'You cannot access this data.',
        )
      }
    } catch (error) {
      console.error(error)
      openNotification(
        notificationTypes.ERROR,
        'You cannot access this data.',
      )
    }
  }