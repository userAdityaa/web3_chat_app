'use client'
import React, { useContext } from 'react'
import { ChatAppContext } from '@/context/ChatAppContext'

const ChatApp = () => {
  const { account, userName, friendList, friendMsg, loading, error } = useContext(ChatAppContext);

  return (
    <div>
      <h1>Hey, {userName || 'Guest'}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Account: {account}</p>
          <p>Friends:</p>
          <ul>
            {friendList.map((friend: any, index: any) => (
              <li key={index}>{friend}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default ChatApp
