const express = require('express');
const app = express();

const port = process.env.port || 3000;
app.use(express.static(path.join(__dirname, './VideoCallPage')));

app.listen(port, () => {
	console.log("Server running at port: " + port);
});

app.get('/', (req, res) => {
	res.send("Welcome to the Homepage")
});

app.get('/call', (req, res) => {
	res.sendFile('./VideoCallPage/call.html', { root: __dirname });
});

