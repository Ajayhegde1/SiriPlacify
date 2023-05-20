import { takeLatest } from 'redux-saga/effects'
import { getStudentProfile, addStudentProfile } from '@/redux/Slices/studentSlice'
import { handleGetStudentProfile, handleADDStudentProfile } from '../handlers/studentProfileHandlers'

export function * studentProfileSagas () {
    yield takeLatest(getStudentProfile.type, handleGetStudentProfile)
    yield takeLatest(addStudentProfile.type, handleADDStudentProfile)
}
  