import { FastifyInstance } from "fastify";
import { openDb } from "../db";
import bcrypt from "bcrypt";
import { signToken } from "../utils/auth";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (req, reply) => {
    const { username, password } = req.body as any;
    const db = await openDb();

    const hash = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", username, hash);

    return { success: true };
  });

  app.post("/login", async (req, reply) => {
    const { username, password } = req.body as any;
    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE username = ?", username);

    if (!user) return reply.code(401).send({ error: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return reply.code(401).send({ error: "Invalid password" });

    const token = signToken({ id: user.id, username: user.username });
    return { token };
  });
}
