import './App.css'
import { useState } from 'react'
import Greeting from './Components/Greeting'
import UserComponent from './UserComponent/UserComponent'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn && <div>
        <h1>Greeting Component</h1>
        <Greeting name="John" timeofDay="morning" />
        <Greeting name="Jane" timeofDay="afternoon" />
        <Greeting name="Doe" timeofDay="evening" />
      </div>
}
     {isLoggedIn && <div>
        <h1>User Component</h1>
        <UserComponent name="John Doe" imageURL="https://i.pinimg.com/originals/1d/87/22/1d872204c01eb784e0c51376e72effb6.jpg" userName="Chanchal Soni" email="chalsoni1998@gmail.com" bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </div>}

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>{!isLoggedIn ? 'Login' : 'Logout'}</button>
      
    </>
  )
}

export default App
