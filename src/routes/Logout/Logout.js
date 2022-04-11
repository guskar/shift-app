import { useEffect } from "react"
import { useNavigate } from "react-router"
import { removeAccessToken } from "../../utils/auth"

export const Logout = () => { 
  const navigate = useNavigate()

  useEffect(() => {
    removeAccessToken()

    navigate('/')
  }, [navigate])

  return null
}