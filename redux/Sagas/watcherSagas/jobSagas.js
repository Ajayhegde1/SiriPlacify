import { takeLatest } from 'redux-saga/effects';
import { getJobs } from '@/redux/Slices/jobSlice';
import { handleGetAllJobs } from '../handlers/jobHandlers';

export function* jobSagas() {
    yield takeLatest(getJobs.type, handleGetAllJobs);
}