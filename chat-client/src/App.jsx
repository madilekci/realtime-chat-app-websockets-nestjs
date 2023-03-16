import React, { useState } from 'react';
import { io } from 'socket.io-client'

// styles
import './App.css'
import JoinChatRoom from './components/JoinChatRoom';
import ChatRoom from './components/ChatRoom';

const socket = io('http://localhost:3001');

function App() {

  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="App">
        {
          !isJoined ?
          <JoinChatRoom socket={socket} setIsJoined={setIsJoined}  />
          :
          <ChatRoom socket={socket} />
        }
    </div>
  )
}

export default App
