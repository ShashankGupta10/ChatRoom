import express, { Express } from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import cors from "cors";

const app: Express = express();
app.use(cors({ origin: "https://chatroom-sg-frontend.vercel.app" }));

const server: http.Server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: { origin: "*" },
});

const PORT: number = 3001;

interface Message {
  sender: string;
  text: string;
}

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("chat message", (message: Message) => {
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
