import { all } from 'redux-saga/effects'
import { userSagas } from './watcherSagas/userSagas'
import { jobSagas } from './watcherSagas/jobSagas'
import { placementPolicySagas } from './watcherSagas/placementSagas'
import { profileSagas } from './watcherSagas/profileSaga'
import { studentProfileSagas } from './watcherSagas/studentProfileSaga'
import {companyProfileSagas} from './watcherSagas/companyProfileSagas'

export default function * rootSaga () {
  yield all([
    userSagas(),
    jobSagas(),
    placementPolicySagas(),
    profileSagas(),
    studentProfileSagas(),
    companyProfileSagas()
    // Add other sagas here if needed
  ])
}
