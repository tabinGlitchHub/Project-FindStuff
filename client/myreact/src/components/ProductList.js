import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import productApi from "../apis/productApi";
import { ProductsContext } from "../context/ProductsContext";

const ProductList = (props) => {
	//destructure prop and store it in context
	const { productList, setProductList } = useContext(ProductsContext);
	//to route to next page
	let history = useHistory();

	//push on detail page of product with matching id
	const handleClick = (id) => {
		history.push(`product/${id}`);
	};

	//fetch all products on init
	useEffect(() => {
		const fetchData = async () => {
			try {
				//get method brings products from database
				const response = await productApi.get("/");
				//set it to productList
				setProductList(response.data.data.products);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<main class='container'>
			<div class='row'>
				{productList.map((product) => {
					return (
						<div
							onClick={() => {
								handleClick(product.id);
							}}
							key={product.id}
							className='box col-xl'>
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
};

export default ProductList;
