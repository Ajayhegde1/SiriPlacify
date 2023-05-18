import { all } from 'redux-saga/effects'
import { userSagas } from './watcherSagas/userSagas'
import { jobSagas } from './watcherSagas/jobSagas'
import { placementPolicySagas } from './watcherSagas/placementSagas'

export default function * rootSaga () {
  yield all([
    userSagas(),
    jobSagas(),
    placementPolicySagas()
    // Add other sagas here if needed
  ])
}
