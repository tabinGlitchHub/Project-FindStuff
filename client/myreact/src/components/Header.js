import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
	let history = useHistory();

	const handleClick = (page) => {
		history.push(page);
	};
	return (
		<div className='header'>
			<h1 className='h1'>Find Stuff</h1>
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
