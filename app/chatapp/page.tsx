'use client'
import React, { useContext } from 'react'
import { ChatAppContext } from '@/context/ChatAppContext'

const ChatApp = () => {
    const {title} = useContext(ChatAppContext)

  return (
    <div>{title}</div>
  )
}

export default ChatApp