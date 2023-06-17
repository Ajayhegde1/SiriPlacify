import { call, put } from 'redux-saga/effects'

import { openNotification, notificationTypes } from '@/utils/notifications'
import { setNotification, updateNotification } from '@/redux/Slices/notificationSlice'
import { getNotifications, updateNotificationRequest } from '../requests/features'

export function* handleGetNotifications() {
    try {
        const response = yield call(getNotifications)
        if (response.data.status === 200) {
            let notifications = response.data.data
            notifications = notifications.map(obj => {
                const date = new Date(obj.madeDate);
                return { ...obj, date };
            });
            notifications = notifications.map(obj => {
                const day = obj.date.getDate().toString().padStart(2, '0');
                const month = (obj.date.getMonth() + 1).toString().padStart(2, '0');
                const year = obj.date.getFullYear().toString();
                const formattedDate = `${day}-${month}-${year}`;
                return { ...obj, formattedDate };
            });
            notifications = notifications.sort((a, b) => b.date - a.date);
            yield put(setNotification(notifications))
        }
        else if (response.data.status === 401) {
            openNotification(
                notificationTypes.ERROR,
                '[500] Internal Server Error',
                'Session ID is invalid or not present.'
            )
        }
        else if (response.data.status === 500) {
            openNotification(
                notificationTypes.ERROR,
                '[500] Internal Server Error',
                'Unable to retrieve notifications.'
            )
        }
        else {
            openNotification(
                notificationTypes.ERROR,
                '[500] Internal Server Error',
                'Unable to retrieve notifications.'
            )
        }
    }
    catch (error) {
        openNotification(
            notificationTypes.ERROR,
            '[500] Internal Server Error',
            'Unable to retrieve notifications.'
        )
    }
}

export function* handleMarkNotifications(action) {
    try {
        const response = yield call(updateNotificationRequest, action.payload)
        if (response.data.status === 200) {
            let notifications = response.data.data
            notifications = notifications.map(obj => {
                const date = new Date(obj.madeDate);
                return { ...obj, date };
            });
            notifications = notifications.map(obj => {
                const day = obj.date.getDate().toString().padStart(2, '0');
                const month = (obj.date.getMonth() + 1).toString().padStart(2, '0');
                const year = obj.date.getFullYear().toString();
                const formattedDate = `${day}-${month}-${year}`;
                return { ...obj, formattedDate };
            });
            notifications = notifications.sort((a, b) => b.date - a.date);
            yield put(setNotification(notifications))
            openNotification(
                notificationTypes.SUCCESS,
                'Success',
                'Notification marked as read.'
            )
        }
        else if (response.data.status === 401) {
            openNotification(
                notificationTypes.ERROR,
                '[500] Internal Server Error',
                'Session ID is invalid or not present.'
            )
        }
        else if (response.data.status === 500) {
            openNotification(
                notificationTypes.ERROR,
                '[500] Internal Server Error',
                'Unable to retrieve notifications.'
            )
        }
        else {
            openNotification(
                notificationTypes.ERROR,
                '[500] Internal Server Error',
                'Unable to retrieve notifications.'
            )
        }
    }
    catch (error) {
        openNotification(
            notificationTypes.ERROR,
            '[500] Internal Server Error',
            'Unable to retrieve notifications.'
        )
    }
}
