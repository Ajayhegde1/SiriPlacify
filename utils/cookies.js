/**
 *
 * @param {*} cookieName should be email address
 */
export const setCookie = (cookieName) => {
    const d = new Date()
    d.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toGMTString()
    document.cookie =
      'username=' + cookieName + ';' + expires + ';path=/; SameSite=Strict'
  }
  
  export const deleteCookie = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict'
  }