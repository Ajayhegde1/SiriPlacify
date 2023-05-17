import { GET, POST } from '@/config/api'
import store from '../../reduxConfig'

export const getAllJobs = () => {
    return GET('/jobs', { sessionID: store.getState().user.sessionId })
}

export const addJob = (body) => {
    return POST('/jobs', body, { sessionID: store.getState().user.sessionId })
}