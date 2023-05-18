import { call, put } from 'redux-saga/effects'

import { setCookie } from '@/utils/cookies'
import { openNotification, notificationTypes } from '@/utils/notifications'
import { setUser } from '@/redux/Slices/userSlice'
import { routes } from '@/constants/routes'

import { signInUser } from '../requests/userRequests'

export function * handleSignIn (action) {
  try {
    const response = yield call(signInUser, action.payload)
    if (response.data.status == 200) {
      setCookie(response.data)
      openNotification(
        notificationTypes.SUCCESS,
        'Sucessfully Logged In!'
      )
      const data = {
        email: action.payload.email,
        username: response.data.username,
        sessionId: response.data.sessionid,
        accType: response.data.accType
      }

      yield put(setUser(data))

      if (response.data.accType === "0"){
        if (response.data.signUpStatus === "0"){
          window.history.replaceState({}, 'Profile', routes.COLLEGEPROFILE)
          window.location.reload()
        }
        else if (response.data.signUpStatus === "1"){
          window.history.replaceState({}, 'Placement Policy', routes.PLACEMENTPROFILE)
          window.location.reload()
        }
        else if (response.data.signUpStatus === "2"){
          window.history.replaceState({}, 'Jobs', routes.JOBS)
          window.location.reload()
        }
        else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Something went wrong'
          )
        }
      }
      else if (response.data.accType === "1"){
        if (response.data.signUpStatus === "0"){
          window.history.replaceState({}, 'Profile', routes.COLLEGEPROFILE)
          window.location.reload()
        }
        else if (response.data.signUpStatus === "1"){
          window.history.replaceState({}, 'Jobs', routes.JOBS)
          window.location.reload()
        }
        else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Something went wrong'
          )
        }
      }
      else{
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Something went wrong'
        )
      }

    } else if (response.data.status == 401) {
      openNotification(
        notificationTypes.ERROR,
        'Incorrect Password!'
      )
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } else if (response.data.status == 404) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'This email does not exist!'
      )
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } else if (response.data.status == 425) {
      openNotification(
        notificationTypes.ERROR,
        'Either Username and Password is not entered. Please enter both'
      )
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } else if (response.data.status === 427) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Email not verified.'
      )
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } else if (response.data.status === 431) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Unable to send verification mail. Please try again later.'
      )
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } else {
      // Notification message invalid creds
      openNotification(
        notificationTypes.ERROR,
        'Invalid Credentials',
        'Please ensure that the email and password match.'
      )
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  } catch (err) {
    console.log(err)
  }
}
