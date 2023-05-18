import { takeLatest } from 'redux-saga/effects'
import { getProfile } from '@/redux/Slices/profile'
import { handleGetCollegeProfile } from '../handlers/profileHandlers'

export function * profileSagas () {
    yield takeLatest(getProfile.type, handleGetCollegeProfile)
}
  