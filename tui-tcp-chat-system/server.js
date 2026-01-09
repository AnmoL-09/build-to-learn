const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected");

  let buffer = "";

  socket.on("data", (chunk) => {
    buffer += chunk.toString();

    while (true) {
      const separatorIndex = buffer.indexOf("::");
      if (separatorIndex === -1) break;

      const lengthPart = buffer.slice(0, separatorIndex);
      const messageLength = Number(lengthPart);

      if (Number.isNaN(messageLength)) {
        console.error("Invalid length");
        socket.destroy();
        return;
      }

      const totalLength = separatorIndex + 2 + messageLength;
      if (buffer.length < totalLength) break;

      const message = buffer.slice(
        separatorIndex + 2,
        totalLength
      );

      buffer = buffer.slice(totalLength);

      console.log("📩 Message:", message);
    }
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("TCP server listening on port 4000");
});
