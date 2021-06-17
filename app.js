const express = require('express');
const app = express();

const port = process.env.port || 3000;

app.listen(port, () => {
	console.log("Server running at port: " + port);
});

app.get('/', (req, res) => {
	res.send("Welcome to the Homepage")
});

app.get('/call', (req, res) => {
	res.sendFile(path.join(__dirname, '/VideoCallPage/call.html'));
});

