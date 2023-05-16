import { call, put } from 'redux-saga/effects'

// Helpers
import { setCookie, deleteCookie } from '@/utils/cookies'
import { routes } from '../../../constants/routes'
import { statusCodes } from '../../../constants/api'
import {
  notificationTypes,
  openNotification
} from '../../../utils/notifications'

// Requests
import { signInUser, signUpUser, signOut } from '../requests/userRequests'
import { setUser } from '../../ducks/userDuck'

export function * handleSignIn (action) {
    try {
      const response = yield call(signInUser, action.payload)
      if (response.data.status == 200) {
        // set username cookie with email value
        setCookie(response.data)
        openNotification(
          notificationTypes.SUCCESS,
          'Sucessfully Logged In!'
        )
        // setRedux with current user json
        yield put(
          setUser({
            email: action.payload.email,
            sessionId: response.data.sessionid,
            accType: response.data.accType
          })
        )
  
        // redirect to XYZ
        window.history.replaceState({}, 'Jobs', routes.JOBS)
        window.location.reload()
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
  
  export function * handleSignOut (action) {
    deleteCookie()
    yield put(resetScans())
    yield put(resetSettings())
    yield put(resetURL())
    yield put(resetCreds())
  
    window.history.replaceState({}, 'Sign In', routes.SIGN_IN)
    window.location.reload()
    setTimeout(() => {
      window.location.reload()
    }, 4000)
  }
  