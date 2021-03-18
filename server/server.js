const express = require("express");
const db = require("./db");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { response } = require("express");
const port = process.env.PORT || 3001;

//to overcome cors policy of sending request from differnt domains
app.use(cors());

//create instance of express
app.use(express.json());

//get all products
app.get("/api/v1/products", async (req, res) => {
	try {
		const products = await db.query("SELECT * FROM products");
		res.status(200).json({
			status: "success",
			result: products.rows.length,
			data: {
				products: products.rows,
			},
		});
	} catch (error) {
		console.log(error);
	}
});

//get all reviews of matching id
app.get("/api/v1/reviews/:id", async (req, res) => {
	try {
		const reviews = await db.query(
			`SELECT * FROM reviews where product_id =$1`,
			[req.params.id]
		);
		res.status(200).json({
			status: "success",
			result: reviews.rows.length,
			data: reviews.rows,
		});
	} catch (error) {
		console.log(error);
	}
});

//get a single product
app.get("/api/v1/products/:id", async (req, res) => {
	try {
		const products = await db.query(`SELECT * FROM products where id =$1`, [
			req.params.id,
		]);
		res.status(200).json({
			status: "success",
			result: products.rows.length,
			data: products.rows[0],
		});
	} catch (error) {
		console.log(error);
	}
});

//post a product
app.post("/api/v1/products/", async (req, res) => {
	try {
		const products = await db.query(
			`INSERT INTO products(name, price, imageurl) values($1,$2,$3) returning *`,
			[req.body.name, req.body.price, req.body.imageurl]
		);
		res.status(200).json({
			status: "successfully created",
			result: products.rows.length,
			data: products.rows[0],
		});
	} catch (error) {
		console.log(error);
	}
});

//update a product
app.put("/api/v1/products/:id", async (req, res) => {
	try {
		const products = await db.query(
			`UPDATE products SET name=$1, price=$2 where id=$3 returning *`,
			[req.body.name, req.body.price, req.params.id]
		);
		res.status(200).json({
			status: "successfully updated",
			result: products.rows.length,
			data: products.rows[0],
		});
	} catch (error) {
		console.log(error);
	}
});

//remove a product
app.delete("/api/v1/products/:id", async (req, res) => {
	try {
		const products = await db.query(`DELETE FROM products where id=$1 `, [
			req.params.id,
		]);
		res.status(200).json({
			status: "successfully deleted",
			result: products.rows.length,
			data: products.rows[0],
		});
	} catch (error) {
		console.log(error);
	}
});

//register a user
app.post("/api/v1/users/register", async (req, res) => {
	try {
		const users = await db.query(
			`INSERT INTO users(user_name, user_password) values($1,$2)`,
			[req.body.user_name, req.body.user_password]
		);
		res.status(200).json({
			status: "successfully registered",
			result: users.rows.length,
			data: users.rows[0],
		});
	} catch (error) {
		console.log(error);
	}
});

//get a user(login)
app.post("/api/v1/users/login", async (req, res) => {
	try {
		const users = await db.query(
			`SELECT * FROM users WHERE user_name=$1 AND user_password=$2`,
			[req.body.user_name, req.body.user_password]
		);
		if (users.rows.length > 0) {
			res.status(200).send({
				status: "success",
				result: users.rows.length,
				data: users.rows[0],
			});
		} else {
			res.status(200).send({
				status: "404",
				result: users.rows.length,
			});
		}
	} catch (error) {
		console.log(error);
		res.send({ error: error });
	}
});

//check if username is taken
app.post("/api/v1/users/verification", async (req, res) => {
	try {
		const users = await db.query(`SELECT * FROM users WHERE user_name=$1`, [
			req.body.user_name,
		]);
		if (users.rows.length > 0) {
			res.status(200).send({
				status: "taken",
				result: users.rows.length,
			});
		} else {
			res.status(200).send({
				status: "free",
				result: users.rows.length,
			});
		}
	} catch (error) {
		console.log(error);
		res.send({ error: error });
	}
});

//add to cart
app.post("/api/v1/users/cart", async (req, res) => {
	try {
		const cart = await db.query(
			`INSERT INTO cart(user_id,product_id) values($1,$2);`,
			[req.body.user_id, req.body.product_id]
		);
		res.status(200).send({
			status: "added to cart",
			result: cart.rows.length,
		});
	} catch (error) {
		console.log(error);
	}
});

//getcart index and total
app.post("/api/v1/users/cart/indices", async (req, res) => {
	try {
		const cart = await db.query(`SELECT * FROM cart WHERE user_id=$1`, [
			req.body.user_id,
		]);
		res.status(200).send({
			status: "success",
			result: cart.rows.length,
			data: cart.rows,
		});
	} catch (error) {
		console.log(error);
	}
});

//get all products matching cart index
app.post("/api/v1/users/cart/list", async (req, res) => {
	try {
		const cart = await db.query(`SELECT * FROM products WHERE id=$1`, [
			req.body.id,
		]);
		res.status(200).send({
			status: "success",
			result: cart.rows.length,
			data: cart.rows,
		});
	} catch (error) {
		console.log(error);
	}
});

//remove from cart
app.delete("/api/v1/users/cart/remove", async (req, res) => {
	try {
		const cart = await db.query(`DELETE FROM cart where product_id=$1`, [
			req.body.product_id,
		]);
		res.status(200).send({
			status: "success",
			result: cart.rows.length,
			data: cart.rows,
		});
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`server up and listening at port ${port}`);
});
