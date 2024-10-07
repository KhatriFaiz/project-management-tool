// Import required modules
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// Our express app instance
const app = express();

// Create a new HTTP server
const server = http.createServer(app);

// Integrate socket.io
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Listen for new connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
