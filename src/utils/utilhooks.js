import { useState } from 'react'
import { getAccessToken } from './auth'
/**
 * A function that returns the accesstoken.
 *
 * @returns {string} The accesstoken.
 */
export const useIsLoggedIn = () => {
  const [, setRefresh] = useState(0)
  const accessToken = getAccessToken(setRefresh)

  return accessToken !== null
}
