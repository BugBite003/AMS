/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("Student");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username === "Avishkar" && password === "123" && role === "Student") {
			navigate("/header");
		} else if (username === "Avi" && password === "123" && role === "Admin") {
			navigate("/admin2");
		} else {
			alert("Invalid username, password, or role");
		}
	};

	const handleRoleChange = (e) => {
		setRole(e.target.value);
	};

	return (
		<div className='login-container'>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<fieldset>
					{/*<legend>Role:</legend>*/}
					<label htmlFor='student'>
						<input
							type='radio'
							id='student'
							name='role'
							value='Student'
							checked={role === "Student"}
							onChange={(e) => setRole(e.target.value)}
						/>
						Student
					</label>
					<label htmlFor='admin'>
						<input
							type='radio'
							id='admin'
							name='role'
							value='Admin'
							checked={role === "Admin"}
							onChange={(e) => setRole(e.target.value)}
						/>
						Admin
					</label>
				</fieldset>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
