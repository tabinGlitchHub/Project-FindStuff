import React from "react";

const Header = () => {
	return (
		<div className='header'>
			<h1 className='h1'>Find Stuff</h1>
			<nav>
				<ul className='nav nav-pills justify-content-end '>
					<li className='nav-item'>
						<a className='nav-link' href='/'>
							Home
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/cart'>
							Cart
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/sell'>
							Sell
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
