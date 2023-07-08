import { takeLatest } from 'redux-saga/effects'

import { getJobApplication } from '@/redux/Slices/jobApplicationSlice'
import { handleGetJobApplications } from '../handlers/jobApplication.handler'

export function * jobApplicationSagas () {
  yield takeLatest(getJobApplication.type, handleGetJobApplications)
} // Compare this snippet from Placify.io/redux/Sagas/watcherSagas/jobSagas.js:
