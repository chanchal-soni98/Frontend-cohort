import React from 'react'
import Avatar from './Avatar'
import UserInfo from './UserInfo'

const UserComponent = ({imageURL, userName, email, bio}) => {
  return (
    <>
        <Avatar imageUrl={imageURL} />
        <UserInfo userName={userName} email={email} bio={bio} /> 
    </>
       
  )
}

export default UserComponent