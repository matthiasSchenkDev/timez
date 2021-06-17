const express = require('express');
const { ExpressPeerServer } = require('peer');
const app = express();

const port = process.env.port || 8080;
app.use(express.static('public'));

const server = app.listen(port, () => {
	console.log("Server running at port: " + port);
});

const peerServer = ExpressPeerServer(server, {
  path: '/timez'
});
app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
	res.send("Welcome to the Homepage")
});

app.get('/call', (req, res) => {
	res.sendFile('./call.html', { root: __dirname });
});

