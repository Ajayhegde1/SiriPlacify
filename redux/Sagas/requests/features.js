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
  return GET( '/collegeProfile' , { sessionID: store.getState().user.sessionId })
}

export const addCollegeProfile = (data) => {
  return POST('/collegeProfile', data, { sessionID: store.getState().user.sessionId })
}