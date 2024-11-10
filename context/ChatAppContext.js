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

  const readMessage = async(friendAddress) => { 
    try { 
      const contract = await connectingWithContract();  
      const read = await contract.readMessage(friendAddress);
    } catch(error) { 
      setError("Currently You have no messages.");
    }
  }

  const createAccount = async({name, accountAddress}) => { 
    try {
      if(name || accountAddress) return setError("Please fill in the form");
      const contract = await connectingWithContract();  
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false); 
      window.location.reload();
    } catch(error) { 
       setError("Error while creating your account please reload the browser.")
    }
  }

  const addFriends = async({name, accountAddress}) => { 
    try { 
      if(name || accountAddress) return setError("Please fill in the form");
      const contract = await connectingWithContract();
      const addFriend = await contract.addFriend(accountAddress, name);
      setLoading(true); 
      await addFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch(error) {
      setError("Something went wrong while adding your friend");
    }
  }

  const sendMessage = async({msg, address}) => { 
    try{ 
      if(msg || address) return setError("Please fill in the form");  
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true); 
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch(error) { 
      setError("Please reload the browser and try again");
    }
  }

  const readUser = async({userAddress}) =>{ 
    const contract = await connectingWithContract();  
     const userName = await contract.getUsername(userAddress);  
     setUserName(userName);
     setCurrentUserAddress(userAddress);
  }

  return (
    <ChatAppContext.Provider 
      value={{
        readMessage, 
        createAccount, 
        addFriends,
        sendMessage,
        readUser, 
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
