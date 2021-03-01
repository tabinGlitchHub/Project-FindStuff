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

app.listen(port, () => {
	console.log(`server up and listening at port ${port}`);
});
