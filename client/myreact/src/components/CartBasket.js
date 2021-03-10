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

	let cartId = [];

	useEffect(() => {
		const fetchData = async () => {
			try {
				//get method brings cart from database
				const response = await cartApi.post("/indices", {
					user_id: currentUserId,
				});
				setCartIndices(response.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		cartIndices.forEach((item) => {
			cartId.push(item.product_id);
		});

		const fetchList = async (i) => {
			try {
				const response = await cartApi.post("/list", {
					id: cartId[i],
				});
				cartList.push(response.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchList();
		for (let i = 0; i < cartId.length; i++) {
			fetchData(i);
		}
	}, []);

	return (
		<main className='container'>
			<div className='row'>
				{cartList.map((product, i) => {
					return (
						<div key={product.id} className='box col-xs'>
							<img
								class='img-fluid image-curve'
								src={product.imageurl}
								alt='dummy'
							/>
							<p id='p'>{product.name}</p>
							<p id='p'>₹ {product.price}</p>
						</div>
					);
				})}
			</div>
		</main>
	);
}

export default CartBasket;
