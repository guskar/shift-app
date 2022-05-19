
import { saveAccessToken } from '../auth'
import { backendFetch } from '../utils'

it('fetches houses', async () => {
  const body = { username: process.env.REACT_APP_TEST_USERNAME, password: process.env.REACT_APP_TEST_PASSWORD }
  const response = await backendFetch('auth/login', 'POST', body, true)
  const data = await response.json()
  saveAccessToken(data.access_token)
  const houses = await backendFetch('houses', 'GET')
  const housesJson = await houses.json()
  expect(housesJson).toEqual([...housesJson])
})
