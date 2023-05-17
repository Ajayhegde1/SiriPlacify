import { takeLatest } from 'redux-saga/effects'

// Handlers
import {
  handleSignIn,
  handleSignOut
} from './handlers/userHandlers'
import { addJobsHandler,getJobData } from './handlers/jobHandlers'

// Action Types
import { SIGN_IN, SIGN_OUT } from '../ducks/userDuck'
import { ADD_JOB,GET_JOB } from '../ducks/jobDuck'

export function * watcherSaga () {
  yield takeLatest(SIGN_IN, handleSignIn)
  yield takeLatest(SIGN_OUT, handleSignOut)
  yield takeLatest(GET_JOB, getJobData)
}