import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const Header = () => {
	let history = useHistory();

	const {
		isLoggedin,
		setIsLoggedIn,
		currentUserName,
		setProductList,
		setCartIndices,
		setCartList,
		setCurrentUserName,
		setCurrentUserid,
	} = useContext(ProductsContext);

	const handleClick = (page) => {
		history.push(page);
	};
	const handleLogInOut = (page) => {
		history.push(page);
		if (isLoggedin) {
			setIsLoggedIn(false);
			setProductList([]);
			setCartIndices([]);
			setCartList([]);
			setCurrentUserName("");
			setCurrentUserid();
		}
	};
	return (
		<div className='header'>
			<h1 className='h1'>Find Stuff</h1>
			<p>{isLoggedin ? "Hello, " + currentUserName : ""}</p>
			<button
				className='loginBtn'
				onClick={() => {
					handleLogInOut("/login");
				}}>
				{isLoggedin ? "Log out" : "Log in"}
			</button>
			<nav>
				<ul className='nav nav-pills justify-content-end '>
					<li className='nav-item'>
						<button
							className='nav-link'
							onClick={() => {
								handleClick("/");
							}}>
							Home
						</button>
					</li>
					<li className='nav-item'>
						<button
							className='nav-link'
							onClick={() => {
								handleClick("/cart");
							}}>
							Cart
						</button>
					</li>
					<li className='nav-item'>
						<button
							className='nav-link'
							onClick={() => {
								handleClick("/sell");
							}}>
							Sell
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
