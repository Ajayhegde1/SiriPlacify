import { takeLatest } from 'redux-saga/effects';
import { signIn } from '@/redux/Slices/userSlice';
import { handleSignIn } from '../handlers/userHandlers';

export function* userSagas() {
  yield takeLatest(signIn.type, handleSignIn);
}