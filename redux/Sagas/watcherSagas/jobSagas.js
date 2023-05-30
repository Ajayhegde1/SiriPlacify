import { takeLatest } from 'redux-saga/effects'
import { getJobs, addJob } from '@/redux/Slices/jobSlice'
import { handleGetAllJobs, handleADDJob } from '../handlers/jobHandlers'

export function * jobSagas () {
  yield takeLatest(getJobs.type, handleGetAllJobs)
  yield takeLatest(addJob.type, handleADDJob)
}
