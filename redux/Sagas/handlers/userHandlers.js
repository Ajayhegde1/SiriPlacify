import { call, put } from 'redux-saga/effects'

import { setCookie, deleteCookie } from '@/utils/cookies'
import { openNotification, notificationTypes } from '@/utils/notifications'
import { setUser, resetUser } from '@/redux/Slices/userSlice'
import { routes } from '@/constants/routes'

import { signInUser } from '../requests/userRequests'

import { resetJob } from '@/redux/Slices/jobSlice'
import { resetPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { resetProfile } from '@/redux/Slices/profile'
import { resetOfferJob } from '@/redux/Slices/offerJobsSlice'
import { resetDeclinedJob } from '@/redux/Slices/declinedJobsSlice'
import { resetStudentProfile } from '@/redux/Slices/studentSlice'
import { resetClosedJob } from '@/redux/Slices/closedJobsSlice'
import { resetCompanyProfile } from '@/redux/Slices/companySlice'

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

      if (response.data.accType === '0') {
        if (response.data.signUpStatus === '0') {
          window.history.replaceState({}, 'Profile', routes.COLLEGEPROFILE)
          window.location.reload()
        } else if (response.data.signUpStatus === '1') {
          window.history.replaceState({}, 'Placement Policy', routes.PLACEMENTPROFILE)
          window.location.reload()
        } else if (response.data.signUpStatus === '2') {
          window.history.replaceState({}, 'Jobs', routes.JOBS)
          window.location.reload()
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Something went wrong'
          )
        }
      } else if (response.data.accType === '1') {
        if (response.data.signUpStatus === '0') {
          window.history.replaceState({}, 'Student Profile', routes.STUDENTPROFILE)
          window.location.reload()
        } else if (response.data.signUpStatus === '1') {
          window.history.replaceState({}, 'Jobs', routes.JOBS)
          window.location.reload()
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Something went wrong'
          )
        }
      } else if (response.data.accType === '2') {
        if (response.data.signUpStatus === '0') {
          window.history.replaceState({}, 'Company Profile', routes.COMPANYPROFILE)
          window.location.reload()
        } else if (response.data.signUpStatus === '1') {
          window.history.replaceState({}, 'Jobs', routes.JOBS)
          window.location.reload()
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Something went wrong'
          )
        }
      } else {
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

export function * handleSignOut (action) {
  deleteCookie()

  yield put(resetUser())
  yield put(resetJob())
  yield put(resetPlacementPolicy())
  yield put(resetProfile())
  yield put(resetOfferJob())
  yield put(resetDeclinedJob())
  yield put(resetStudentProfile())
  yield put(resetClosedJob())
  yield put(resetCompanyProfile())

  openNotification(
    notificationTypes.SUCCESS,
    'Sucessfully Logged Out!'
  )

  window.history.replaceState({}, 'Sign In', routes.SIGN_IN)
  window.location.reload()
  setTimeout(() => {
    window.location.reload()
  }, 4000)
}
