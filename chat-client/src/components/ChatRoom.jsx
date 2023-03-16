import React, { useState, useEffect } from 'react'
import MessageInput from './MessageInput';

import Messages from './Messages';
import TypingDisplay from './TypingDisplay';

const ChatRoom = ({ socket }) => {
  return (
    <div className="chatContainer">

            <Messages socket={socket} />

            <TypingDisplay socket={socket} />

            <MessageInput socket={socket} />
        </div>
  )
}

export default ChatRoom