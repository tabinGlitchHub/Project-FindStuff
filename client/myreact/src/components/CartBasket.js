import React, { useContext, useEffect, useState } from "react";
import cartApi from "../apis/cartApi";
import { ProductsContext } from "../context/ProductsContext";

function CartBasket() {
	const { cartList } = useContext(ProductsContext);

	if (cartList.length === 0) {
		return (
			<main className='container'>
				<div>
					<p>Such empty...Login and add something to your Cart!</p>
				</div>
			</main>
		);
	} else {
		return (
			<main className='container'>
				<div className='row'>
					{cartList.map((product) => {
						return (
							<div key={product[0].id} className='box col-xs'>
								<img
									className='img-fluid image-curve'
									src={product[0].imageurl}
									alt='dummy'
								/>
								<p id='p'>{product[0].name}</p>
								<p id='p'>₹ {product[0].price}</p>
							</div>
						);
					})}
				</div>
			</main>
		);
	}
}

export default CartBasket;
