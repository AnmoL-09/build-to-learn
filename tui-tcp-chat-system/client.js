// importing required modules 
const net = require("net");

// initializing client
const client = net.createConnection({ port: 4000 }, () => {
    console.log("Connected to server");
    client.write("Hello from client!");
});

client.on("data", (data) => {
    console.log("From server: ", data.toString());
});

client.on("end", () => {
    console.log("Disconnected from server");
});