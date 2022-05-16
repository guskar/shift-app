
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
/**
 * React map component.
 *
 * @type {object} Props
 * @returns { React.ReactElement} Renders the google maps cpmponent.
 */
const Map = ({ location }) => {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [address, setAddress] = useState('')

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_API_KEY })

  useEffect(() => {
    /**
     * Fetches the google api to set long and lat on current house.
     */
    const fetcher = async () => {
      setAddress(location)
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${process.env.REACT_APP_NEXT_PUBLIC_API_KEY}`, {
        method: 'GET'
      })
      const resp = await response.json()
      setLatitude(resp.results[0].geometry.location.lat)
      setLongitude(resp.results[0].geometry.location.lng)
    }
    fetcher()
  }, [address, location])

  return isLoaded
    ? (
    <GoogleMap zoom={10}
      center={{ lat: latitude, lng: longitude }} mapContainerStyle={{ width: '100%' }}
      options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false }}>
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
      )
    : <>Loading...</>
}

export default Map
