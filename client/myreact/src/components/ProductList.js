import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import cartApi from "../apis/cartApi";
import productApi from "../apis/productApi";
import { ProductsContext } from "../context/ProductsContext";

const ProductList = (props) => {
	//destructure prop and store it in context
	const {
		productList,
		setProductList,
		cartIndices,
		setCartIndices,
		setCartList,
		currentUserId,
	} = useContext(ProductsContext);
	//to route to next page
	let history = useHistory();
	const list = [];

	//push on detail page of product with matching id
	const handleClick = (id) => {
		history.push(`product/${id}`);
	};

	//fetch all products & cart on init
	useEffect(() => {
		//fetch all products
		const fetchAllProducts = async () => {
			try {
				//get method brings products from database
				const response = await productApi.get("/");
				//set it to productList
				setProductList(response.data.data.products);
			} catch (error) {
				console.log(error);
			}
		};
		//fetch all product Ids that are in user's cart
		const fetchCart = async () => {
			try {
				//get method brings cart-ids from database
				const response = await cartApi
					.post("/indices", {
						user_id: currentUserId,
					})
					.then((response) => {
						setCartIndices(response.data.data);
					});
			} catch (error) {
				console.log(error);
			}
		};

		fetchCart();
		fetchAllProducts();
	}, []);

	//fetch all Products from product Ids fetched from 'fetchCart'
	useEffect(() => {
		const fetchCartProducts = async (item) => {
			try {
				const response = await cartApi
					.post("/list", {
						id: item.product_id,
					})
					.then((response) => {
						list.push(response.data.data);
						setCartList(list);
					});
			} catch (error) {
				console.log(error);
			}
		};
		cartIndices.forEach((item) => {
			fetchCartProducts(item);
		});
	}, [cartIndices]);

	return (
		<main className='container'>
			<div className='wrapper'>
				{productList.map((product) => {
					return (
						<div
							onClick={() => {
								handleClick(product.id);
							}}
							key={product.id}
							className='box'>
							<img
								className='img-fluid image-curve'
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
};

export default ProductList;
