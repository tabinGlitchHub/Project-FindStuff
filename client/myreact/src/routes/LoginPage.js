import React, { useState } from "react";
import usersApi from "../apis/usersApi";

const LoginPage = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const [currentUserName, setCurrentUserName] = useState("");
	const [currentPassword, setcurrentassword] = useState("");

	//handle post request
	const handleRegSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await usersApi.post("/register", {
				user_name: userName,
				user_password: password,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await usersApi.get("/login", {
				user_name: currentUserName,
				user_password: currentPassword,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container card loginForm'>
			<form>
				<div className='mb-3'>
					<h2>Login</h2>
					<label className='form-label'>Username</label>
					<input
						type='text'
						placeholder='JimHalpert'
						onChange={(e) => {
							setUserName(e.target.value);
						}}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Password</label>
					<input
						type='text'
						placeholder='******'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<div>
					<button className='btn btn-primary' type='submit'>
						Login
					</button>
				</div>
			</form>
			<hr />
			<form>
				<div className='mb-3'>
					<h2>Register</h2>
					<label className='form-label'>Username</label>
					<input
						type='text'
						placeholder='JimHalpert'
						onChange={(e) => {
							setUserName(e.target.value);
						}}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Password</label>
					<input
						type='text'
						placeholder='******'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<div>
					<button
						className='btn btn-primary'
						type='submit'
						onClick={handleRegSubmit}>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
