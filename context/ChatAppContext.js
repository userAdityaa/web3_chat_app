import React, { createContext, useEffect, useState } from 'react';
import { CheckIfWalletConnected, connectingWithContract } from '../utils/apiFeature';
import { useRouter } from 'next/navigation';

export const ChatAppContext = createContext(); 

export const ChatAppProvider = ({ children }) => { 
  const [account, setAccount] = useState(""); 
  const [userName, setUserName] = useState(""); 
  const [friendList, setFriendList] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState(false);

  const [currentUser, setCurrentUser] = useState(''); 
  const [currentUserAddress, setCurrentUserAddress] = useState('');

  const router = useRouter(); 

  const fetchData = async () => { 
    try { 
      console.log("Checking wallet connection...");
      const contract = await connectingWithContract(); 
      const currentAccount = await CheckIfWalletConnected(); 
      setAccount(currentAccount);
      const userName = await contract.getUsername(currentAccount);
      setUserName(userName); 
      const friendLists = await contract.getMyFriendList(currentAccount);
      setFriendList(friendLists);
      const userLists = await contract.getAllAppUser();
      setUserLists(userLists);
    } catch (error) {
      setError("Please install and connect your wallet"); 
    }
  };

  useEffect(() => { 
    fetchData();
  }, []);

  const readMessages = async(friendAddress) => { 
    try { 
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress); 
      setFriendMsg(read);
    } catch(error) { 
      setError('Current user is not connected to the contract');
    }
  }

  return (
    <ChatAppContext.Provider 
      value={{
        account, 
        userName, 
        friendList, 
        friendMsg, 
        loading, 
        userLists, 
        error, 
        currentUser, 
        currentUserAddress 
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
