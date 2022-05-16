import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { removeAccessToken } from '../../utils/auth'

/**
 * A rote for logging out. Navigates user to '/'.
 *
 * @returns {object} null.
 */
export const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    removeAccessToken()

    navigate('/')
  }, [navigate])

  return null
}
