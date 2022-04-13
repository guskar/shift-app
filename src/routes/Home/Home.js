

import PrintHouses from "../../components/PrintHouses/PrintHouses"
import PrintUserHouses from "../../components/PrintUserHouses/PrintUserHouses"

import { useIsLoggedIn } from "../../utils/utilhooks"

const Home = () => {

  const isLoggedIn = useIsLoggedIn()




  return (

    <div id='houseDiv'>
      {!isLoggedIn && <div id='backgroundDiv'>
        <h1>Shift-Make a change today</h1>
      </div>}

      {!isLoggedIn && <h2>Your should register!</h2>}

      <div>
        {isLoggedIn && <PrintHouses></PrintHouses>}
      </div>

      <div>
        <h1>Userhouses</h1>
        {isLoggedIn && <PrintUserHouses></PrintUserHouses>}
      </div>


    </div>
  )
}

export default Home