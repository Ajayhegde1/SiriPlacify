import { takeLatest } from 'redux-saga/effects'
import { getJobs, addJob, addJobByCompany } from '@/redux/Slices/jobSlice'
import { handleGetAllJobs, handleADDJob,handleADDJobByCompany } from '../handlers/jobHandlers'

export function * jobSagas () {
  yield takeLatest(getJobs.type, handleGetAllJobs)
  yield takeLatest(addJob.type, handleADDJob)
  yield takeLatest(addJobByCompany.type, handleADDJobByCompany)
}
