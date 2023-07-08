import { takeLatest } from 'redux-saga/effects'
import { getPlacementPolicy, addPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { handleGetPlacementPolicy, handleADDPlacementPolicy } from '../handlers/placementPolicyHandlers'

export function * placementPolicySagas () {
  yield takeLatest(getPlacementPolicy.type, handleGetPlacementPolicy)
  yield takeLatest(addPlacementPolicy.type, handleADDPlacementPolicy)
}
