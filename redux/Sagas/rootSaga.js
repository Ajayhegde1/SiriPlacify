import { all } from 'redux-saga/effects';
import { userSagas } from './watcherSagas/userSagas';
import { jobSagas } from './watcherSagas/jobSagas';

export default function* rootSaga() {
  yield all([
    userSagas(),
    jobSagas(),
    // Add other sagas here if needed
  ]);
}
