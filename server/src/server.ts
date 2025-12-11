import Fastify from "fastify";
import websocketPlugin from "fastify-websocket";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";

const app = Fastify({ logger: true });
app.register(websocketPlugin);

// Register API routes
app.register(authRoutes, { prefix: "/api/auth" });
app.register(gameRoutes, { prefix: "/api/game" });

// WebSocket route
app.get("/ws/game", { websocket: true }, (connection, req) => {
  console.log("WebSocket client connected!");
  connection.socket.on("message", (msg: Buffer) => {
    console.log("Received WS message:", msg.toString());
    // Here we will parse JSON and update GameSession
  });
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
