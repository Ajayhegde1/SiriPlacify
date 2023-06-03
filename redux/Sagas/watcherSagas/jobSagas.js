import { takeLatest } from 'redux-saga/effects'
import { getJobs, addJob, addJobByCompany } from '@/redux/Slices/jobSlice'
import { handleGetAllJobs, handleADDJob, handleADDJobByCompany } from '../handlers/jobHandlers'
import { getOfferJob } from '@/redux/Slices/offerJobsSlice'
import { getDeclinedJob } from '@/redux/Slices/declinedJobsSlice'
import { getClosedJob } from '@/redux/Slices/closedJobsSlice'
import { handleGetClosedJobsHandler } from '../handlers/closedJobs.handler'
import { handleGetOfferJobsHandler } from '../handlers/offerJobsHandler'
import { handleGetDeclinedJobs } from '../handlers/declinedJobsHandler'

export function * jobSagas () {
  yield takeLatest(getJobs.type, handleGetAllJobs)
  yield takeLatest(getOfferJob.type, handleGetOfferJobsHandler)
  yield takeLatest(getDeclinedJob.type, handleGetDeclinedJobs)
  yield takeLatest(getClosedJob.type, handleGetClosedJobsHandler)
  yield takeLatest(addJob.type, handleADDJob)
  yield takeLatest(addJobByCompany.type, handleADDJobByCompany)
}
