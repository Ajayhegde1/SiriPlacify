import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { setPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { getPlacementPolicy } from '../requests/features'

export function* handleGetPlacementPolicy() {
    try {
        const response = yield call(getPlacementPolicy)
        if (response.data.status === '200') {
            yield put(setPlacementPolicy(response.data.data))
        } else {
            openNotification(
                notificationTypes.ERROR,
                '[500] Internal Server Error',
                'Something went wrong. Please try again later.'
            )
        }
    }
    catch (error) {
        console.error(error)
        openNotification(
            notificationTypes.ERROR,
            '[500] Internal Server Error',
            'Something went wrong. Please try again later.'
        )
    }
}