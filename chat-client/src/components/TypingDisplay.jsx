import React, { useState, useEffect } from 'react'

const TypingDisplay = ({ socket }) => {
    const [TypingText, setTypingText] = useState('')

    socket.on('typing', ({ name, isTyping }) => {
        isTyping ? setTypingText(`${name} is typing ...`) : setTypingText('');
    })

  return (
        <div className="typingText">{ TypingText !== '' && TypingText }</div>
  )
}

export default TypingDisplay