import React, { useState } from 'react';
import { Col, Row } from 'antd';

import { io } from 'socket.io-client'

// styles
import './App.css'
import JoinChatRoom from './components/JoinChatRoom';
import ChatRoom from './components/ChatRoom/ChatRoom';

const socket = io('http://localhost:3001');

function App() {

  const [isJoined, setIsJoined] = useState(false);

  return (
    <Row className="App">
        <Col className='container' sm={24} md={16} >
          {
            !isJoined ?
            <JoinChatRoom socket={socket} setIsJoined={setIsJoined}  />
            :
            <ChatRoom socket={socket} />
          }
        </Col>
    </Row>
  )
}

export default App
