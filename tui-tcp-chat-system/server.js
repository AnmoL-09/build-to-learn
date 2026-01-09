const net = require("net");

let clientIdCounter = 1;
const clients = new Map();

const server = net.createServer((socket) => {
  const clientId = clientIdCounter++;
  console.log(`Client ${clientId} connected`);

  clients.set(clientId, socket);

  let buffer = "";

  socket.on("data", (chunk) => {
    buffer += chunk.toString();

    while (true) {
      const sep = buffer.indexOf("::");
      if (sep === -1) break;

      const len = Number(buffer.slice(0, sep));
      if (Number.isNaN(len)) {
        socket.destroy();
        return;
      }

      const total = sep + 2 + len;
      if (buffer.length < total) break;

      const message = buffer.slice(sep + 2, total);
      buffer = buffer.slice(total);

      broadcast(clientId, message);
    }
  });

  socket.on("end", () => {
    console.log(`Client ${clientId} disconnected`);
    clients.delete(clientId);
  });

  socket.on("error", () => {
    clients.delete(clientId);
  });
});

function broadcast(senderId, message) {
  const payload = `User ${senderId}: ${message}`;
  const framed = `${payload.length}::${payload}`;

  for (const [id, socket] of clients) {
    if (id !== senderId) {
      socket.write(framed);
    }
  }
}

server.listen(4000, () => {
  console.log("TCP chat server running on port 4000");
});
