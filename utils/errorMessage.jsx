import { openNotification, notificationTypes } from '@/utils/notifications';

export function handleErrorResponse(response) {
  const errorMessages = {
    401: 'Session ID is invalid or not present.',
    423: 'Unable to retrieve college.',
    424: 'Unable to retrieve jobs.',
    425: 'Invalid job type.',
    426: 'Unable to retrieve company.',
    427: 'Invalid User Type.',
    500: 'Unable to retrieve Job Successfully.',
    default: 'Something went wrong. Please try again later.'
  };

  const status = response.data.status;
  const errorMessage = errorMessages[status] || errorMessages.default;
  openNotification(notificationTypes.ERROR, '[500] Internal Server Error', errorMessage);
}
