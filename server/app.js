const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "http://localhost:5173" } });

app.use(cors((origin = "http://localhost:5173")));
const PORT = 3001;

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("chat message", (message) => {
    console.log("Received message:", message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
