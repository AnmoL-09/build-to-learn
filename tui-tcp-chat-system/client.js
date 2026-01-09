const net = require("net");
const readline = require("readline");

const client = net.createConnection({ port: 4000 }, () => {
  console.log("Connected to chat");
});

let buffer = "";

client.on("data", (chunk) => {
  buffer += chunk.toString();

  while (true) {
    const sep = buffer.indexOf("::");
    if (sep === -1) break;

    const len = Number(buffer.slice(0, sep));
    const total = sep + 2 + len;
    if (buffer.length < total) break;

    const message = buffer.slice(sep + 2, total);
    buffer = buffer.slice(total);

    console.log(message);
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", (line) => {
  const framed = `${line.length}::${line}`;
  client.write(framed);
});
