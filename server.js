const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
var express = require('express');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const { Server } = require('ws');

const wss = new Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', function (message) {
  	if (message) {
  		try {
  			const data = JSON.parse(jsonEscape(message));

	  		wss.clients.forEach((client) => {
	    		client.send(data);
	  		});
  		} catch(error) {}	
  	}
  });

  ws.on('close', () => {});
});

function jsonEscape(str)  {
    return str.replace(/\n/g, " ").replace(/\r/g, "").replace(/\t/g, "");
}
