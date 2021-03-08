import react from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Cart from "./routes/Cart";
import ProductDetail from "./routes/ProductDetail";
import SellProduct from "./routes/SellProduct";
import { ProductContextProvider } from "./context/ProductsContext";
import LoginPage from "./routes/LoginPage";

function App() {
	return (
		<div>
			<ProductContextProvider>
				<Router>
					<Switch>
						<Route exact path='/login' component={LoginPage}/>
						<Route exact path='/' component={Home} />
						<Route exact path='/cart' component={Cart} />
						<Route exact path='/product/:id' component={ProductDetail} />
						<Route exact path='/sell' component={SellProduct} />
					</Switch>
				</Router>
			</ProductContextProvider>
		</div>
	);
}

export default App;
