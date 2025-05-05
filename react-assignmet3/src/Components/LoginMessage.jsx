import React from 'react'
// If isLoggedIn is true: render "Welcome back, User!"
// If isLoggedIn is false: render "Please log in."
const LogInMessage = ({isLogin}) => {
  return (
    <>
        {isLogin ? <h1>Welcome back, User!</h1> : <h1>Please log in.</h1>}
    </>
    
  )
}

export default LogInMessage