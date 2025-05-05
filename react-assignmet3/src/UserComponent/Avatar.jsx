import React from 'react'
// Create a UserProfile component that contains the following subcomponents:

// Avatar: A component that displays a user's profile picture.
// 

// Deliverables:

// Code for the UserProfile, Avatar, and UserInfo components.
// Example usage of the UserProfile component inside a parent component, passing in relevant data.
const Avatar = ({imageUrl}) => {
  return (
    <div>
        <img src={imageUrl} alt="User Avatar" style={{width: '100px', height: '100px', borderRadius: '50%'}} />
    </div>
  )
}

export default Avatar