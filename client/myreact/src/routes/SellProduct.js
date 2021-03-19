import React, { useContext, useEffect, useState } from "react";
import productApi from "../apis/productApi";
import Header from "../components/Header";
import SellProductForm from "../components/SellProductForm";
import { ProductsContext } from "../context/ProductsContext";

function SellProduct() {
	const { currentUserId, productsForSale, setProductsForSale ,isLoggedin} = useContext(
		ProductsContext
	);
	const [isVisible, setIsVisible] = useState(false);

	const fetchForSale = async () => {
		try {
			const response = await productApi.post("/forsale", {
				owner_id: currentUserId,
			});
			setProductsForSale(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchForSale();
	}, []);

	const displayForm = () => {
		if (isVisible) {
			return (
				<div>
					<hr/>
					<SellProductForm />
				</div>
			);
		} else {
			return <br />;
		}
	};

	const removeFromProductsList = (id) => {
		const removeItem = async (id) => {
			try {
				const response = await productApi.delete("/delete", {
					data: {
						id,
					},
				});
			} catch (error) {
				console.log(error);
			}
		};
		setProductsForSale(productsForSale.filter((product) => product.id !== id));
		removeItem(id);
	};

	const renderComponent = () => {
		if (productsForSale.length > 0) {
			return (
				<main className='container'>
					<div className='row'>
						{productsForSale.map((product) => {
							return (
								<div key={product.id} className='box col-xl'>
									<img
										className='img-fluid image-curve'
										src={product.imageurl}
										alt='dummy'
									/>
									<p id='p'>{product.name}</p>
									<p id='p'>₹ {product.price}</p>
									<button
										className='btn btn-danger'
										onClick={() => {
											removeFromProductsList(product.id);
										}}>
										Stop Supply
									</button>
								</div>
							);
						})}
					</div>
					<button
						className='btn btn-primary'
						onClick={() => {
							if (isVisible === false) {
								setIsVisible(true);
							} else {
								setIsVisible(false);
							}
						}}>
						+
					</button>
					<div>{displayForm()}</div>
				</main>
			);
		} else {
			if (isLoggedin){
				return (
					<main className='container'>
						<p>You don't have anything up for sale...</p>
						<SellProductForm />
					</main>
				);
			}else{
				return<h>You can't sell anything without logging in...</h>
			}
				
		}
	};

	return (
		<div>
			<Header />
			{renderComponent()}
		</div>
	);
}

export default SellProduct;
