import { POST, GET } from '@/config/api'

export const signInUser = (userData) => {
  return POST('/login', userData)
}
