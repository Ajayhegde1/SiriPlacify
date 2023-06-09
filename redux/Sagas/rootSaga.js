import { all } from 'redux-saga/effects'
import { userSagas } from './watcherSagas/userSagas'
import { jobSagas } from './watcherSagas/jobSagas'
import { placementPolicySagas } from './watcherSagas/placementSagas'
import { profileSagas } from './watcherSagas/profileSaga'
import { studentProfileSagas } from './watcherSagas/studentProfileSaga'
import { companyProfileSagas } from './watcherSagas/companyProfileSagas'
import { jobApplicationSagas } from './watcherSagas/jobApplicationSagas'

export default function * rootSaga () {
  yield all([
    userSagas(),
    jobSagas(),
    placementPolicySagas(),
    profileSagas(),
    studentProfileSagas(),
    companyProfileSagas(),
    jobApplicationSagas()
    // Add other sagas here if needed
  ])
}
