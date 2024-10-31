import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CheckIfWalletConnected, connectWallet, connectingWithContract } from '../utils/apiFeature'

export const ChatAppContext = React.createContext(); 
 
export const ChatAppProvider = ({children}) => { 
    const title = "Hey welcome to blockchain chat app"; 
    return (
        <ChatAppContext.Provider value={{title}}>
            {children}
        </ChatAppContext.Provider>
    )
}