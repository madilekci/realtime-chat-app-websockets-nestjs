import React, { useState } from 'react';

const MessageInput = ({ socket }) => {
    const [messageText, setMessageText] = useState('');

	let timeout;
	const emitTyping = () => {
		socket.emit('typing', { isTyping: true });
		timeout = setTimeout(() => {
			socket.emit('typing', { isTyping: false });
		}, 500);
	};

	const handleMessageInputChange = (e) => {
		setMessageText(e.target.value);
		emitTyping();
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		messageText.length > 2 &&
        await socket.emit('createMessage', { text: messageText }, () => {
			setMessageText('');
		});
	};

	return (
		<div className='messageInput'>
			<form onSubmit={sendMessage}>
				<label htmlFor='messageInput'>Message :</label>
				<input
					id='messageInput'
					type='text'
					value={messageText}
					onChange={handleMessageInputChange}
					style={{ margin: '0px 10px' }}
				/>
				<button type='submit'>Send</button>
			</form>
		</div>
	);
};

export default MessageInput;
