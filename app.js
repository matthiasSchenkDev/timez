const express = require('express');
const app = express();

const port = process.env.port || 3000;

app.listen(port, () => {
	console.log("Server running");
});

app.get('/', (req, res) => {
	res.send("Welcome to the Homepage")
});