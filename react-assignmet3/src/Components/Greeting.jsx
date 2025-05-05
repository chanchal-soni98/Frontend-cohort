import React from 'react'
const Greeting = ({name,timeofDay}) => {
  return (
    <div>{`Good ${timeofDay}, ${name}`}</div>
  )
}

export default Greeting