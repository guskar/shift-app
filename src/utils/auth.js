/**
 * A function that sets the cookie.
 *
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 * @param {number} days Days
 */
function setCookie (name, value, days) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

/**
 * A function that gets the cookie.
 *
 * @param {string} name The name of the cookie.
 * @returns {string} string representing the cookie.
 */
function getCookie (name) {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const refreshers = []

/**
 * A function tha erases the current cookie on logout.
 *
 * @param {string} name The name of the cookie.
 */
function eraseCookie (name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

/**
 * Saves the access-token to set cookie.
 *
 * @param {string} accessToken String representing the cookie.
 */
export function saveAccessToken (accessToken) {
  setCookie('access_token', accessToken, 1)

  refreshers.forEach(r => r(Math.random()))
}

/**
 * Sets refreshers.
 *
 * @param {number} refresh random number.
 * @returns {Function} getcookie.
 */
export function getAccessToken (refresh) {
  if (refresh) {
    refreshers.push(refresh)
  }

  return getCookie('access_token')
}

/**
 * A function that removes accesstoken on logout.
 */
export function removeAccessToken () {
  eraseCookie('access_token')
  refreshers.forEach(r => r(Math.random()))
}
/**
 * Gets the username from payload.
 *
 * @returns {string} A string representing the username.
 */
export function getLoggedInUserName () {
  const accessToken = getAccessToken()
  const splittedAcces = accessToken.split('.')
  const encodedStringAtoB = splittedAcces[1]
  const decodedStringAtoB = atob(encodedStringAtoB)
  const data = JSON.parse(decodedStringAtoB)

  return data.sub
}
