import { getAccessToken } from './auth'

/**
 * A function that simplifies fetching data from/to the backend.
 *
 * @type {string} The endpoint to POST
 * @returns {string} The accesstoken.
 */
export const backendFetch = async (endpoint, method, data, omitAccessToken) => {
  // `http://localhost:8081/api/v1/`
  // `https://cscloud8-44.lnu.se/shift/api/v1/`

  const response = await fetch(`https://cscloud8-44.lnu.se/shift/api/v1/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(omitAccessToken ? {} : { Authorization: `Bearer ${getAccessToken()}` })
    },
    ...(data ? { body: JSON.stringify(data) } : {})
  })

  return response
}
export default backendFetch
