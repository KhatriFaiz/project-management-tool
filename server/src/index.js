// Import required modules
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import { connect } from "mongoose";
import { socketEvents } from "../../common/utils/SocketEvents.js";
import mongoose from "mongoose";
import createUserWithEmailAndPassword from "./services/auth/createUserWithEmailAndPassword.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { projectListners } from "./listners/projectListners.js";

// Import Models
import User from "./models/User.model.js";

// Our express app instance
const app = express();
config();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// Add routes
app.use("/auth", authRouter);

// Create a new HTTP server
const server = createServer(app);

connect("mongodb://127.0.0.1:27017/project_management");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Integrate socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    // If no token is provided, reject the connection
    return next(new Error("Authentication error: Token required"));
  }

  // Verify the JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Reject the connection if the token is invalid or expired
      const error = new Error("Authentication error: Invalid token");
      console.log(error);
      return next();
    }

    User.findById(decoded.userId, "name username email").then((user) => {
      socket.user = user; // Attach decoded token data to the socket
      // Attach user data to the socket after successful verification
      next(); // Allow the connection
    });
  });
});

// Listen for new connections
io.on("connection", (socket) => {
  console.log("A user connected");
  // Listen for disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on(socketEvents.AUTH.signupWithEmailAndPassword, async (data) => {
    const { user, token } = await createUserWithEmailAndPassword(data);
    socket.emit(socketEvents.AUTH.successfulLogin, user, token);
  });

  projectListners(socket);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
