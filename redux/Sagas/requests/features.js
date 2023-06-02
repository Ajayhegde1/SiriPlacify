import { GET, POST } from '@/config/api'
import { store } from '@/redux/configureStore'

export const getAllJobs = () => {
  return GET('/v2/jobs?jobType=current', { sessionID: store.getState().user.sessionId })
}

export const getOfferJobs = () => {
  return GET('/v2/jobs?jobType=offer', { sessionID: store.getState().user.sessionId })
}

export const getDeclinedJobs = () => {
  return GET('/v2/jobs?jobType=declined', { sessionID: store.getState().user.sessionId })
}

export const getClosedJobs = () => {
  return GET('/v2/jobs?jobType=closed', { sessionID: store.getState().user.sessionId })
}

export const getJob = (id) => {
  return GET(`/job?jobID=${id}`, { sessionID: store.getState().user.sessionId })
}

export const getPlacementPolicy = () => {
  return GET('/placementPolicy', { sessionID: store.getState().user.sessionId })
}

export const getCollegeProfile = () => {
  return GET('/collegeProfile', { sessionID: store.getState().user.sessionId })
}

export const addCollegeProfile = (data) => {
  return POST('/collegeProfile', data, { sessionID: store.getState().user.sessionId })
}

export const addPlacementPolicy = (data) => {
  return POST('/placementPolicy', data, { sessionID: store.getState().user.sessionId })
}

export const addJobs = (data) => {
  return POST('/jobs', data, { sessionID: store.getState().user.sessionId })
}

export const addJobsByCompany = (data) => {
  return POST('/companyJobs', data, { sessionID: store.getState().user.sessionId })
}

export const getCompanyJobs = () => {
  return GET('/v2/jobs?jobType=open', { sessionID: store.getState().user.sessionId })
}

export const getColleges = (jobID) => {
  return GET(`/colleges?jobID=${jobID}`, { sessionID: store.getState().user.sessionId })
}

export const getOfferColleges = (jobID) => {
  return GET(`/offeredColleges?jobID=${jobID}`, { sessionID: store.getState().user.sessionId })
}

export const sendOfferColleges = (data,jobID) => {
  return POST(`/offerColleges?jobID=${jobID}`, data, { sessionID: store.getState().user.sessionId })
}

export const getAppliedStudents = (jobID) => {
  return GET(`/appliedStudents?jobID=${jobID}`, { sessionID: store.getState().user.sessionId })
}

export const getStudentProfile = () => {
  return GET('/studentProfile', { sessionID: store.getState().user.sessionId })
}

export const addStudentProfile = (data) => {
  return POST('/studentProfile', data, { sessionID: store.getState().user.sessionId })
}

export const getCompany = () => {
  return GET('/company', { sessionID: store.getState().user.sessionId })
}

export const addCompany = (data) => {
  return POST('/company', data, { sessionID: store.getState().user.sessionId })
}

export const getStudentJobs = () => {
  return GET('/v2/jobs', { sessionID: store.getState().user.sessionId })
}

export const applyJob = (data) => {
  return POST('/applyJobs', data, { sessionID: store.getState().user.sessionId })
}

export const getStudentAppliedJobs = () => {
  return GET('/getJobApplications', { sessionID: store.getState().user.sessionId })
}
