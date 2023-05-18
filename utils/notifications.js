import { notification } from 'antd'

export const notificationTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
}

/**
 *
 * @param {String} type Must be selected from 'notificationTypes' object in src/utils/notifications.js
 * @param {String} title The title of the notification.
 * @param {String} msg The message of the notification.
 */
export const openNotification = (type, title, msg) => {
  notification[type]({
    message: title,
    description: msg
  })
}
