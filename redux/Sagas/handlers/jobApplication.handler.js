import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setJobApplication } from '@/redux/Slices/jobApplicationSlice'
import { getStudentAppliedJobs } from '../requests/features'
import { store } from '@/redux/configureStore'

export function * handleGetJobApplications () {
    try{
        if (store.getState().user.accType === '1') {
            const res = yield call(getStudentAppliedJobs)
            if (res.data.status === 200) {
                yield put(setJobApplication(res.data.data))
              } else if (res.data.status === 401) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Session ID is invalid or not present'
                )
              } else if (res.data.status === 424) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'No Job Applications found'
                )
              } else if (res.data.status === 500) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'unable to retrieve job applications'
                )
              } else {
                openNotification(
                  notificationTypes.WARNING,
                  'No Jobs Found'
                )
              }
        }
        else{
            openNotification(
                notificationTypes.ERROR,
                'You cannot access this data.'
            )
        }
    }
    catch(error){
        openNotification(
            notificationTypes.ERROR,
            '[500] Internal Server Error',
            'Something went wrong. Please try again later.'
        )
    }
}