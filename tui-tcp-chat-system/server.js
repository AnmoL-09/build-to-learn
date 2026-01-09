//importing required modules
const net = require("net");

// defining server
const server = net.createServer((socket) =>{
    console.log("Client connected");

    socket.on("data", (data) => {
        console.log("Raw Data Received: ", data.toString());
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (err) => {
        console.error("Socket error: ", err.message);
    });    
});

// server listening 
const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});