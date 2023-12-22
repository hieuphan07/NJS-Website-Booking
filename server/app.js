const express = require('express');
const app = express();
const serverPort = 5500;

app.get('/', (req, res, next) => {
	res.send('Hello Node JS');
});

app.listen(serverPort, () => {
	console.log(`Server listening on port ${serverPort}`);
});
