import React from 'react';

// components
import MessageInput from '../MessageInput';
import Messages from '../Messages';
import TypingDisplay from '../TypingDisplay';

import { Col, Row } from 'antd';

// styles
import './chatroom.styles.css';

const ChatRoom = ({ socket }) => {
	return (
		<Row className='chatContainer'>
			<Col className='chatContainerColumn' span={20} offset={2}>
            <Messages socket={socket} />
					<div>
            <TypingDisplay socket={socket} />
					  <MessageInput socket={socket} />
          </div>
			</Col>
		</Row>
	);
};

export default ChatRoom;
