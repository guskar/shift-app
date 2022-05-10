
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api'

const Map = () => {
  const {isLoaded} = useJsApiLoader({googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_API_KEY})
 
  
  
  return isLoaded?(
    <GoogleMap zoom={10}
    center={{lat: 44, lng: -80}} mapContainerStyle={{width:'100%'}}
    options={{zoomControl: false, streetViewControl: false, mapTypeControl: false}}>
    <Marker position={{lat: 44, lng: -80}}/>
    </GoogleMap>
  ): <>Loading...</>
}

export default Map