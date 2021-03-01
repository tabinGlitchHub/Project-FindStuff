import React from "react";
import Header from "../components/Header";
import SellProductForm from "../components/SellProductForm";

function SellProduct() {
	return (
		<div>
			<Header />
			<h3>What do you wanna sell today?</h3>
			<SellProductForm />
		</div>
	);
}

export default SellProduct;
