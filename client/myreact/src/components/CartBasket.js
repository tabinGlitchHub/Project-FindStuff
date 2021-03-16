import React, { useContext, useEffect, useState } from "react";
import cartApi from "../apis/cartApi";
import { ProductsContext } from "../context/ProductsContext";

function CartBasket() {
	const {
		cartIndices,
		setCartIndices,
		cartList,
		setCartList,
		currentUserId,
		productList,
	} = useContext(ProductsContext);

	useEffect(() => {
		const fetchCart = async () => {
			try {
				//get method brings cart-ids from database
				const response = await cartApi
					.post("/indices", {
						user_id: currentUserId,
					})
					.then((response) => {
						if (cartIndices.length !== response.data.data.length) {
							setCartIndices(response.data.data);
						}
					});
			} catch (error) {
				console.log(error);
			}
		};
		fetchCart();
	}, []);

	useEffect(() => {
		const fetchProducts = async (item) => {
			try {
				const response = await cartApi
					.post("/list", {
						id: item.product_id,
					})
					.then((response) => {
						cartList.push(response.data.data);
					});
			} catch (error) {
				console.log(error);
			}
		};
		if (cartIndices.length !== cartList.length) {
			cartIndices.forEach((item) => {
				fetchProducts(item);
			});
		}
	}, [cartIndices,cartList]);

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
