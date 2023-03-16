import React, { useState } from 'react';

const JoinChatRoom = ({ socket, setIsJoined }) => {
    const [name, setName] = useState('');

	const join = (e) => {
		e.preventDefault();
		socket.emit('join', { name: name }, (response) => {
			setIsJoined(true);
		});
	};

	return (
		<div>
			<form onSubmit={join}>
				<label htmlFor=''>What's your name ?</label>
				<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
				<button type='submit'>Send</button>
			</form>
		</div>
	);
};

export default JoinChatRoom;
