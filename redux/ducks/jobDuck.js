// Initial State
export const initialJobState = [];

// Actions
export const SET_JOB = 'SET_JOB';
export const RESET_JOB = 'RESET_JOB';
export const GET_JOB = 'GET_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const ADD_JOB = 'ADD_JOB';
export const DELETE_JOB = 'DELETE_JOB';

export const getJobs = () => ({
  type: GET_JOB
});

export const resetJob = () => ({
  type: RESET_JOB
});

export const setJob = (payload) => ({
  type: SET_JOB,
  payload
});

export const updateJob = (payload) => ({
  type: UPDATE_JOB,
  payload
});

export const deleteJob = (payload) => ({
  type: DELETE_JOB,
  payload
});

export const addJob = (payload) => ({
  type: ADD_JOB,
  payload
});

const jobReducer = (state = initialJobState, action) => {
  switch (action.type) {
    case SET_JOB:
      return action.payload;
    case RESET_JOB:
      return initialJobState;
    case UPDATE_JOB:
      return [...state, action.payload];
    case ADD_JOB:
      return [...state, action.payload];
    case DELETE_JOB:
      return state.filter((job) => job.id !== action.payload.id);
    case GET_JOB:
      return state;
    default:
      return state;
  }
};

export default jobReducer;
