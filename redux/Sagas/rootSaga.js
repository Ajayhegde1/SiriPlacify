import { all } from 'redux-saga/effects'
import { userSagas } from './watcherSagas/userSagas'
import { jobSagas } from './watcherSagas/jobSagas'
import { placementPolicySagas } from './watcherSagas/placementSagas'
import { profileSagas } from './watcherSagas/profileSaga'

export default function * rootSaga () {
  yield all([
    userSagas(),
    jobSagas(),
    placementPolicySagas(),
    profileSagas()
    // Add other sagas here if needed
  ])
}
