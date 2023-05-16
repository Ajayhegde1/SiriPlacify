import { POST } from '@/config/api'

/**
 *
 * @param {Object} userData Expects an object in the format { email: email, password: password }
 * @returns {Promise} Promise for the SignIn API request
 */
export const signInUser = (userData) => {
  return POST('/login', userData)
}

/**
 *
 * @param {Object} userData Expects an object in the format { email: email, password: password }
 * @returns {Promise} Promise for the SignUp API request
 */
export const signUpUser = (userData) => {
  return POST('/signUp', userData)
}

/**
 *
 * @param {Object} userData Should be a {}
 * @returns {Promise} Promise for the SignOut API request
 */
export const signOut = (sessionId, userData = {}) => {
  return POST('/logout', userData, { sessionID: sessionId })
}
