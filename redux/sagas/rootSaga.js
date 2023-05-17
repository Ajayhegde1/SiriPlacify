import { takeLatest } from 'redux-saga/effects'

// Handlers
import {
  handleSignIn,
  handleSignOut
} from './handlers/userHandlers'

// Action Types
import { SIGN_IN, SIGN_OUT } from '../ducks/userDuck'

export function * watcherSaga () {
  yield takeLatest(SIGN_IN, handleSignIn)
  yield takeLatest(SIGN_OUT, handleSignOut)
}