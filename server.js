const PORT = 5000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    ws.send("Echo message sent back from server: " + message);
  });
  ws.send("Hello! Message from server. You've just connected to the server!!");

  ws.on('close', () => console.log('Client disconnected'));
});

