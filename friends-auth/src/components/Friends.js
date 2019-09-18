import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosAuth";

const Friends = () => {
	const [friends, setFriends] = useState([]);
	const [newFriend, setNewFriend] = useState({
		id: "",
		name: "",
		age: "",
		email: ""
	});

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		axiosWithAuth()
			.get(`http://localhost:5000/api/friends`)
			.then(res => {
				setFriends(res.data);
			})
			.catch(err => console.log("get request error ", err.response));
	};

	const handleChange = e => {
		setNewFriend({
			...newFriend,
			[e.target.name]: e.target.value
		});
	};

	const handleChangeNumber = e => {
		setNewFriend({
			...newFriend,
			[e.target.name]: parseInt(e.target.value)
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(newFriend);
		axiosWithAuth()
			.post(`http://localhost:5000/api/friends`, newFriend)
			.then(res => console.log(res))
			.catch(err => console.log("post error ", err.response.data.error));
		getData();
	};

	return (
		<div>
			<h2>New friends</h2>
			<div className="login">
				<form onSubmit={handleSubmit}>
					<input
						type="number"
						value={newFriend.id}
						name="id"
						placeholder="ID"
						onChange={handleChangeNumber}
					/>
					<input
						type="text"
						value={newFriend.name}
						name="name"
						placeholder="Name"
						onChange={handleChange}
					/>
					<input
						type="number"
						value={newFriend.age}
						name="age"
						placeholder="Age"
						onChange={handleChangeNumber}
					/>
					<input
						type="text"
						value={newFriend.email}
						name="email"
						placeholder="email"
						onChange={handleChange}
					/>
					<button>Add New Friend</button>
				</form>
			</div>

			{friends &&
				friends.map(friend => {
					return (
						<div key={friend.id}>
							<h4>Name: {friend.name}</h4>
							<p>Age: {friend.age}</p>
							<p>Email: {friend.email}</p>
						</div>
					);
				})}
		</div>
	);
};

export default Friends;
