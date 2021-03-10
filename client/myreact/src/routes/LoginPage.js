import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import usersApi from "../apis/usersApi";
import { ProductsContext } from "../context/ProductsContext";

const LoginPage = () => {
	const {
		setCurrentUserid,
		setIsLoggedIn,
		currentUserName,
		setCurrentUserName,
	} = useContext(ProductsContext);

	//login credentials
	const [currentPassword, setCurrentPassword] = useState("");

	//register credentials
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const [loginWarningText, setLoginWarningText] = useState("");
	const [regWarningText, setRegWarningText] = useState("");

	let history = useHistory();

	//handle register request
	const handleRegSubmit = async (e) => {
		e.preventDefault();

		//check if username already exists
		try {
			const response = await usersApi.post("/verification", {
				user_name: userName,
			});
			if (response.data.status === "taken") {
				setRegWarningText("UserName Taken");
			} else if (response.data.status === "free") {
				if (userName.length > 16 || userName.length < 4) {
					setRegWarningText(
						"UserName must be more than 4 characters and less than 16 characters long!"
					);
				} else {
					try {
						const response = await usersApi.post("/register", {
							user_name: userName,
							user_password: password,
						});
						setRegWarningText("Successfully Registered! Now you may Login");
					} catch (error) {
						console.log(error);
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await usersApi
				.post("/login", {
					user_name: currentUserName,
					user_password: currentPassword,
				})
				.then((response) => {
					if (response.data.status === "success") {
						setIsLoggedIn(true);
						setLoginWarningText("");
						setCurrentUserid(response.data.data.user_id);
						history.push(`/`);
					} else {
						setLoginWarningText("Incorrect User name or password");
					}
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
							setCurrentUserName(e.target.value);
						}}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Password</label>
					<input
						type='text'
						placeholder='******'
						onChange={(e) => {
							setCurrentPassword(e.target.value);
						}}
					/>
				</div>
				<div>{loginWarningText}</div>
				<div>
					<button
						className='btn btn-primary'
						type='submit'
						onClick={handleLoginSubmit}>
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
				<div>{regWarningText}</div>
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
