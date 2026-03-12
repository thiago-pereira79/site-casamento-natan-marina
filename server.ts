import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("wedding.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    guests INTEGER,
    attending BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/rsvp", async (req, res) => {
    const { name, phone, email, guests, attending } = req.body;
    try {
      // 1. Save to Database
      const stmt = db.prepare(
        "INSERT INTO rsvp (name, phone, email, guests, attending) VALUES (?, ?, ?, ?, ?)"
      );
      stmt.run(name, phone, email, guests, attending ? 1 : 0);

      // 2. Log Notification (Private)
      const notifyWhatsApp = process.env.NOTIFY_WHATSAPP || "5516988329622";
      console.log(`[RSVP Received] Name: ${name}, Phone: ${phone}, Attending: ${attending}`);

      res.json({ success: true });
    } catch (error) {
      console.error("Error processing RSVP:", error);
      res.status(500).json({ error: "Erro ao salvar RSVP" });
    }
  });

  app.get("/api/messages", (req, res) => {
    try {
      const messages = db.prepare("SELECT * FROM messages ORDER BY created_at DESC").all();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar mensagens" });
    }
  });

  app.post("/api/messages", (req, res) => {
    const { name, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO messages (name, message) VALUES (?, ?)");
      stmt.run(name, message);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao salvar mensagem" });
    }
  });

  app.delete("/api/messages/:id", (req, res) => {
    const { id } = req.params;
    try {
      const stmt = db.prepare("DELETE FROM messages WHERE id = ?");
      stmt.run(Number(id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Erro ao excluir mensagem" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
