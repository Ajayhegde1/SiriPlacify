import { POST } from '@/config/api'

export const signInUser = (userData) => {
  return POST('/login', userData)
}
