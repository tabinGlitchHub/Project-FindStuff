const { Pool } = require("pg");
const express = require("express");

const pool = new Pool();

//create pool
module.exports = {
	query: (text, params) => pool.query(text, params),
};
