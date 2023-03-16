import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'

// styles
import './App.css'
import JoinChatRoom from './components/JoinChatRoom';

const socket = io('http://localhost:3001');

function App() {

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [typingDisplay, setTypingDisplay] = useState('')

  const getAllMessages = () => socket.emit('findAllMessages', {}, (response) => {
    setMessages(response);
  });

  useEffect(() => {
    getAllMessages();
  }, [socket]);

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      getAllMessages();
    });
  }, []);


  useEffect(() => {
    socket.on('typing', ({who, isTyping}) => {
      isTyping ? setTypingDisplay(`${who} is typing ...`) : setTypingDisplay('');
    })
  }, [socket])


  const sendMessage = async(e) => {
    e.preventDefault();
    await socket.emit('createMessage' , { text: messageText }, () => {
      setMessageText('');
    });
  }

  let timeout;
  const emitTyping = () => {
    socket.emit('typing', { isTyping: true })
    timeout = setTimeout(() => {
      socket.emit('typing', {isTyping: false});
    }, 500);
  }

  const handleMessageInputChange = e => {
    setMessageText(e.target.value);
    emitTyping();
  }

  return (
    <div className="App">
        {
          !isJoined ?
          <JoinChatRoom socket={socket} setIsJoined={setIsJoined}  />
          :
          <div className="chatContainer">
            <div className="messagesContainer">
              {
                messages.map( (message, index ) => {
                  return (<div key={index}>
                    [ { message.name } ] : { message.text }
                  </div>)
                })
              }
            </div>

            {
              typingDisplay !== '' &&
              <div className="typingDisplay">{ typingDisplay }</div>
            }

            <div className="messageInput">
              <form onSubmit={sendMessage}>
                <label htmlFor="messageInput">Message :</label>
                <input id='messageInput' type="text" value={messageText} onChange={handleMessageInputChange} style={{margin: '0px 10px'}} />
                <button type='submit'>Send</button>
              </form>
            </div>
        </div>
        }
    </div>
  )
}

export default App
