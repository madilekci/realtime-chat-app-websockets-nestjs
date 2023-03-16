import React, { useState, useEffect } from 'react';

const Messages = ({ socket }) => {
	const [messages, setMessages] = useState([]);
	const getAllMessages = () =>
		socket.emit('findAllMessages', {}, (response) => {
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

	return (
		<div className='messagesContainer'>
			{messages.map((message, index) => {
				return (
					<div key={index}>
						[ {message.name} ] : {message.text}
					</div>
				);
			})}
		</div>
	);
};

export default Messages;
