import React from 'react'
const UserInfo = ({userName, email, bio}) => {
  return (
    <div>
        <h2>{userName}</h2>
        <p>{email}</p>
        <p>{bio}</p>
    </div>
  )
}

export default UserInfo