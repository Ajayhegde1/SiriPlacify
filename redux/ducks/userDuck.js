// Initial State
export const initialUserState = null

// Action Types
export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_USER = 'SET_USER'

// SignUp Action types
export const BEFORE_SIGNIN = 'BEFORE_SIGNIN'
export const PENDING_SIGNIN = 'PENDING_SIGNIN'
export const FINISHED_SIGNIN = 'FINISHED_SIGNIN'

// Actions
export const signUp = (payload) => ({
  type: SIGN_UP,
  payload
})

export const signIn = (payload) => ({
  type: SIGN_IN,
  payload
})

export const signOut = () => ({
  type: SIGN_OUT
})

export const setUser = (payload) => ({
  type: SET_USER,
  payload
})

// Reducer
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case SIGN_OUT:
      return initialUserState
    default:
      return state
  }
}

export default userReducer