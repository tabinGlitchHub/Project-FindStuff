import { useState, createContext } from "react";

export const ProductsContext = createContext();

export const ProductContextProvider = (props) => {
	const [productList, setProductList] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [reviews, setReviews] = useState([]);

	return (
		<ProductsContext.Provider
			value={{
				productList,
				setProductList,
				selectedProduct,
				setSelectedProduct,
				reviews,
				setReviews
			}}>
			{props.children}
		</ProductsContext.Provider>
	);
};
