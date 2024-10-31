import React, { createContext, useState } from 'react';

export const ChatAppContext = createContext({ title: 'Something toh show karo' });

export const ChatAppProvider = ({ children }) => {
  const [title, setTitle] = useState('Default Title');

  return (
    <ChatAppContext.Provider value={{ title, setTitle }}>
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
