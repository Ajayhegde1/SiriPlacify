import { takeLatest } from 'redux-saga/effects'
import { getCompanyProfile, addCompanyProfile } from '@/redux/Slices/companySlice'
import { handleGetCompanyProfile, handleADDCompanyProfile } from '../handlers/companyProfileHandler'

export function * companyProfileSagas () {
  yield takeLatest(getCompanyProfile.type, handleGetCompanyProfile)
  yield takeLatest(addCompanyProfile.type, handleADDCompanyProfile)
}
