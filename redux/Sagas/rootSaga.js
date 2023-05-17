import { all } from 'redux-saga/effects';
import { userSagas } from './watcherSagas/userSagas';

export default function* rootSaga() {
  yield all([
    userSagas(),
    // Add other sagas here if needed
  ]);
}
