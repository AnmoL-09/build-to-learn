// importing required modules 
const net = require("net");

// initializing client
const client = net.createConnection({ port: 4000 }, () => {
    console.log("Connected to server");

    send("hello");
    send("hello world");
    send("this is a longer message to test the TCP chat system");
})

// function to send messages to server
function send(message) {
    const framed = `${message.length}::${message}`;
    client.write(framed);
}