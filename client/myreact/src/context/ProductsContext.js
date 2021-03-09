import { useState, createContext } from "react";

export const ProductsContext = createContext();

export const ProductContextProvider = (props) => {
	const [isLoggedin, setIsLoggedIn] = useState(false);
	const [productList, setProductList] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [reviews, setReviews] = useState([]);
	const [currentUserName, setCurrentUserName] = useState("");

	return (
		<ProductsContext.Provider
			value={{
				productList,
				setProductList,
				selectedProduct,
				setSelectedProduct,
				reviews,
				setReviews,
				isLoggedin,
				setIsLoggedIn,
				currentUserName,
				setCurrentUserName,
			}}>
			{props.children}
		</ProductsContext.Provider>
	);
};
