import { takeLatest } from 'redux-saga/effects'
import { getProfile, addProfile } from '@/redux/Slices/profile'
import { handleGetCollegeProfile, handleADDCollegeProfile } from '../handlers/profileHandlers'

export function * profileSagas () {
  yield takeLatest(getProfile.type, handleGetCollegeProfile)
  yield takeLatest(addProfile.type, handleADDCollegeProfile)
}
