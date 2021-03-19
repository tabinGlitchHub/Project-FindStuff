import React, { useContext, useState } from "react";
import productApi from "../apis/productApi";
import { ProductsContext } from "../context/ProductsContext";

const SellProductForm = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(null);
	const [img, setImg] = useState("");

	const { currentUserId } = useContext(ProductsContext);

	//handle post request
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await productApi.post("/", {
				name,
				price,
				imageurl: img,
				owner_id: currentUserId,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h4>Tell Us about your Product.</h4>
			<form>
				<div>
					<p>Name of the product</p>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type='text'
						placeholder='Some cool Stuff'
					/>
				</div>
				<div>
					<p>How much for?</p>
					<input
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						type='text'
						placeholder='Something Profitable'
					/>
				</div>
				<div>
					<p>What does it look like?</p>
					<input
						value={img}
						onChange={(e) => setImg(e.target.value)}
						type='text'
						placeholder='cool'
					/>
				</div>
				<button type='submit' onClick={handleSubmit}>
					Sell
				</button>
			</form>
		</div>
	);
};

export default SellProductForm;
