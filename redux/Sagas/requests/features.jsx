import { GET, POST, DELETE } from '@/config/api'
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

export const getClosed = () => {
  return GET('/v2/jobs?jobType=closed', { sessionID: store.getState().user.sessionId })
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

export const sendOfferColleges = (data, jobID) => {
  return POST(`/offerColleges?jobID=${jobID}`, data, { sessionID: store.getState().user.sessionId })
}

export const getAppliedStudents = (jobID) => {
  return GET(`/appliedStudents?jobID=${jobID}`, { sessionID: store.getState().user.sessionId })
}

export const getCandidates = (jobID, collegeID) => {
  return GET(`/candidates?jobID=${jobID}&collegeID=${collegeID}`, { sessionID: store.getState().user.sessionId })
}

export const UpdateStatus = (data) => {
  return POST('/updateStatus', data, { sessionID: store.getState().user.sessionId })
}

export const closeJob = (jobID) => {
  return POST(`/closeJob?jobID=${jobID}`, {}, { sessionID: store.getState().user.sessionId })
}

export const updateProfile = (data) => {
  return POST('/updateCollegeProfile', data, { sessionID: store.getState().user.sessionId })
}

export const updateCompanyProfile = (data) => {
  return POST('/updateCompany', data, { sessionID: store.getState().user.sessionId })
}

export const updateJob = (jobID, data) => {
  return POST(`/updateJob?jobID=${jobID}`, data, { sessionID: store.getState().user.sessionId })
}

export const updateJobTPO = (jobID, data) => {
  return POST(`/updateJobTPO?jobID=${jobID}`, data, { sessionID: store.getState().user.sessionId })
}

export const updatePlacementPolicy = (data) => {
  return POST('/updatePlacementPolicy', data, { sessionID: store.getState().user.sessionId })
}

export const getStudents = () => {
  return GET('/getStudents', { sessionID: store.getState().user.sessionId })
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

export const withdrawJob = (data) => {
  return POST('/withdrawJob', data, { sessionID: store.getState().user.sessionId })
}

export const getStudentAppliedJobs = () => {
  return GET('/getJobApplications', { sessionID: store.getState().user.sessionId })
}

export const getTPODashboard = () => {
  return GET('/getTPODashboard', { sessionID: store.getState().user.sessionId })
}

export const getCompanyDashboard = () => {
  return GET('/companyDashboard', { sessionID: store.getState().user.sessionId })
}

export const getNotifications = () => {
  return GET('/notifications', { sessionID: store.getState().user.sessionId })
}

export const updateNotificationRequest = (Id) => {
  return POST(`/updateNotification?notificationId=${Id}`, {}, { sessionID: store.getState().user.sessionId })
}

export const GetStudent = (id) => {
  return GET(`/student?studentId=${id}`, { sessionID: store.getState().user.sessionId })
}

export const deleteStudent = (id) => {
  return DELETE(`/student?studentID=${id}`, {}, { sessionID: store.getState().user.sessionId })
}

export const uploadResume = (filename, contentType) => {
  return GET(`/uploadResume?filename=${filename}&content_type=${contentType}`, { sessionID: store.getState().user.sessionId })
}

export const getResume = () => {
  return GET('/getResume', { sessionID: store.getState().user.sessionId })
}

export const uploadJobDescFile = (filename, ID) => {
  return GET(`/uploadJD?filename=${filename}&jobID=${ID}`, { sessionID: store.getState().user.sessionId })
}

export const getJobDescFile = (ID) => {
  return GET(`/getJD?jobID=${ID}`, { sessionID: store.getState().user.sessionId })
}

export const getCandidateResume = (id) => {
  return GET(`/getCandidateResume?studentID=${id}`, { sessionID: store.getState().user.sessionId })
}

export const schedulePPT = (data) => {
  return POST('/schedulePPT', data, { sessionID: store.getState().user.sessionId })
}

export const scheduleTest = (data) => {
  return POST('/scheduleTest', data, { sessionID: store.getState().user.sessionId })
}

export const scheduleInterview = (data) => {
  return POST('/scheduleInterview', data, { sessionID: store.getState().user.sessionId })
}

export const getSpecificJobApplication = (id) => {
  return GET(`/getJobApplication?id=${id}`, { sessionID: store.getState().user.sessionId })
}

export const getDepartment = () => {
  return GET('/department', { sessionID: store.getState().user.sessionId })
}

export const getDegrees = () => {
  return GET('/degrees', { sessionID: store.getState().user.sessionId })
}

export const getJobData = (jobID, collegeID) => {
  return GET(`/getJobData?jobID=${jobID}&collegeID=${collegeID}`, { sessionID: store.getState().user.sessionId })
}
