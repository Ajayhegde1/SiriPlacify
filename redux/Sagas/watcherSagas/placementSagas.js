import { takeLatest } from 'redux-saga/effects'
import { getPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { handleGetPlacementPolicy } from '../handlers/placementPolicyHandlers'

export function * placementPolicySagas () {
  yield takeLatest(getPlacementPolicy.type, handleGetPlacementPolicy)
}
