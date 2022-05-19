import { useState, useEffect, useCallback } from 'react'
import { getAccessToken } from './auth'
import { backendFetch } from './utils'

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

/**
 * A function that returns a house and its conversations (comments).
 *
 * @type {string} the id of the house to fetch
 * @returns {object} The accesstoken
 */
export const useHouse = (id) => {
  const [houseState, setHouseState] = useState({
    conversations: {},
    house: undefined,
    requestMade: undefined
  })

  const refetch = useCallback(
    async () => {
      const response = await backendFetch(`houses/${id}`, 'GET')

      if (response.status === 200) {
        const conversations = {}

        const json = await response.json()

        let requestMade = false
        json.comments.forEach(comment => {
          if (!conversations[comment.conversationid]) {
            conversations[comment.conversationid] = []
            requestMade = true
          }
          conversations[comment.conversationid].push(comment)
        })

        setHouseState({
          conversations,
          requestMade,
          house: json.house
        })
      } else {
        setHouseState({
          conversations: {},
          requestMade: false,
          house: undefined
        })
      }
    },
    [id]
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  return {
    ...houseState,
    refetch
  }
}
