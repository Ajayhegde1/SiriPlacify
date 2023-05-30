import { GET, POST } from '@/config/api'
import { store } from '@/redux/configureStore'

export const getAllJobs = () => {
  return GET('/jobs', { sessionID: store.getState().user.sessionId })
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

export const getAppliedStudents = (jobID) => {
  return GET(`/appliedStudents?jobID=${jobID}`, { sessionID: store.getState().user.sessionId })
}

export const getStudentProfile = () => {
  return GET('/studentProfile', { sessionID: store.getState().user.sessionId })
}

export const addStudentProfile = (data) => {
  return POST('/studentProfile', data, { sessionID: store.getState().user.sessionId })
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
