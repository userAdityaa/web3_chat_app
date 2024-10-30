pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    // create_account:
    function createAccount(string calldata name) external {
        require(!checkUserExists(msg.sender), "User already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        userList[msg.sender].name = name;
    }

    // get_username:
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "User does not exist");
        return userList[pubkey].name;
    }

    // add_friend:
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User does not exist");
        require(msg.sender != friend_key, "Cannot add yourself as a friend");
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "Already friends"
        );
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    // check_already_friends:
    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }

        for (uint i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) {
                return true;
            }
        }
        return false;
    }

    function _addFriend(
        address currentUser,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[currentUser].friendList.push(newFriend);
    }
}
