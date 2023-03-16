import React, { useState } from 'react';

import { Input, Button, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';


const { TextArea } = Input;

const MessageInput = ({ socket }) => {
    const [messageText, setMessageText] = useState('');

	let timeout;
	const emitTyping = () => {
		socket.emit('typing', { isTyping: true });
		timeout = setTimeout(() => {
			socket.emit('typing', { isTyping: false });
		}, 3000);
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
			<TextArea
				maxLength={255}
				style={{
					height: 120,
					resize: 'none',
				}}
				value={messageText}
				onChange={handleMessageInputChange}
				placeholder="Your message :"
			/>
			<div style={{display: 'flex', flexDirection: 'row-reverse', marginTop: '16px' }}>
				<Button
					type="primary"
					icon={<SendOutlined />}
					onClick={sendMessage}
					>
					Send
				</Button>
			</div>
		</div>
	);
};

export default MessageInput;
