import { takeLatest } from 'redux-saga/effects'
import { signIn, signOut } from '@/redux/Slices/userSlice'
import { handleSignIn, handleSignOut } from '../handlers/userHandlers'

export function * userSagas () {
  yield takeLatest(signIn.type, handleSignIn)
  yield takeLatest(signOut.type, handleSignOut)
}
