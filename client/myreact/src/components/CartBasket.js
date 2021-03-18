import React, { useContext, useEffect, useState } from "react";
import cartApi from "../apis/cartApi";
import { ProductsContext } from "../context/ProductsContext";

function CartBasket() {
	const { cartList, setCartList, totalAmount, setTotalAmount } = useContext(
		ProductsContext
	);
	let tempAmount = 0;
	let list = [];

	const calculateTotalAmount = () => {
		cartList.forEach((product) => {
			tempAmount += product[0].price;
		});
		setTotalAmount(tempAmount);
		return totalAmount;
	};

	const removeFromCart = (id) => {
		const removeItem = async (id) => {
			try {
				const response = await cartApi.delete("/remove", {
					data: {
						product_id: id,
					},
				});
			} catch (error) {
				console.log(error);
			}
		};
		setCartList(cartList.filter((product) => product[0].id !== id));
		removeItem(id);
	};

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
				<h2>Your Cart</h2>
				<div className='row'>
					{cartList.map((product) => {
						return (
							<div key={product[0].id} className='box col-xl'>
								<img
									className='img-fluid image-curve'
									src={product[0].imageurl}
									alt='dummy'
								/>
								<p id='p'>{product[0].name}</p>
								<p id='p'>₹ {product[0].price}</p>
								<button
									className='btn btn-primary'
									onClick={() => {
										removeFromCart(product[0].id);
									}}>
									Remove from cart
								</button>
							</div>
						);
					})}
				</div>
				<div>
					<h4>Total Amount:₹{calculateTotalAmount()}</h4>
				</div>
			</main>
		);
	}
}

export default CartBasket;
