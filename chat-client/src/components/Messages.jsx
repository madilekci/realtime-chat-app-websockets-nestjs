import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const Messages = ({ socket }) => {
	const [messages, setMessages] = useState([]);

	const getAllMessages = () =>
		socket.emit('findAllMessages', {}, (response) => {
			setMessages(response);
		});

	useEffect(() => {
		getAllMessages();
	}, []);

	socket.on('newMessage', (newMessage) => {
		getAllMessages();
	});

	return (
		<div className='messagesContainer'>
			{messages.map((message, index) => {
				return <MessageCard key={index} {...message}></MessageCard>;
			})}
		</div>
	);
};

const MessageCard = ({ name, text }) => (
	<Card bodyStyle={{padding: '6px 16px'}} >
		<span style={{fontSize: '0.8rem', fontWeight:'600'}}>{name}</span> : <span style={{fontSize: '1.1rem', fontWeight:'400'}}>{text}</span>
	</Card>
);

export default Messages;
