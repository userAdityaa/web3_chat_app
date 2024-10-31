import React, { createContext, useContext } from 'react';

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const title = "Hey, welcome to blockchain chat app";
  
  return (
    <ChatAppContext.Provider value={{ title }}>
      {children}
    </ChatAppContext.Provider>
  );
};

export const useChatAppContext = () => {
  const context = useContext(ChatAppContext);
  if (!context) {
    throw new Error("useChatAppContext must be used within a ChatAppProvider");
  }
  return context;
};
