import React, { useState } from 'react';

import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const JoinChatRoom = ({ socket, setIsJoined }) => {
	const [name, setName] = useState('');

	const join = (values) => {
		socket.emit('join', { name: values.fullName }, (response) => {
			setIsJoined(true);
		});
	};

	return (
		<div className='joinContainer' style={{ display: 'flex', justifyContent: 'center'}}>
			<Form name='joinChatroom' layout='inline' onFinish={join} >
				<Form.Item
					name='fullName'
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full name" />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Join to chat !
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default JoinChatRoom;

{
	/* <form onSubmit={join}>
			<label htmlFor=''>What's your name ?</label>
			<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
			<button type='submit'>Send</button>
		</form> */
}
