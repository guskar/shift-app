import { useState } from "react"
import { getAccessToken } from "./auth"

export const useIsLoggedIn = () => {
  const [, setRefresh] = useState(0) 
  const access_token = getAccessToken(setRefresh)

  return access_token !== null
}