import "dotenv/config";
import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// conexão Supabase
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const adminPassword = process.env.ADMIN_PASSWORD as string;

const supabase = createClient(supabaseUrl, supabaseKey);

// SQLite (usado apenas para RSVP)
const db = new Database("wedding.db");

// criar tabela RSVP se não existir
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
`);

// anti-spam simples em memória
const lastMessageByIp = new Map<string, number>();
const lastDuplicateByIp = new Map<string, { text: string; timestamp: number }>();

function getClientIp(req: Request) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket.remoteAddress || "unknown";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ===============================
  // LOGIN ADMIN
  // ===============================
  app.post("/api/admin/login", (req: Request, res: Response) => {
    try {
      const password = req.body?.password;

      if (!adminPassword) {
        return res.status(500).json({ error: "Senha de admin não configurada." });
      }

      if (!password) {
        return res.status(400).json({ error: "Senha não enviada." });
      }

      if (password !== adminPassword) {
        return res.status(401).json({ error: "Senha incorreta." });
      }

      return res.json({ success: true });
    } catch (err) {
      console.error("Erro login admin:", err);
      return res.status(500).json({ error: "Erro interno no login." });
    }
  });

  // ===============================
  // RSVP (SQLite)
  // ===============================
  app.post("/api/rsvp", async (req: Request, res: Response) => {
    const { name, phone, email, guests, attending } = req.body;

    try {
      const stmt = db.prepare(
        "INSERT INTO rsvp (name, phone, email, guests, attending) VALUES (?, ?, ?, ?, ?)"
      );

      stmt.run(name, phone, email, guests, attending ? 1 : 0);

      console.log(`[RSVP] Nome: ${name}, Telefone: ${phone}, Presença: ${attending}`);

      return res.json({ success: true });
    } catch (error) {
      console.error("Erro RSVP:", error);
      return res.status(500).json({ error: "Erro ao salvar RSVP" });
    }
  });

  // ===============================
  // BUSCAR MENSAGENS (Supabase)
  // ===============================
  app.get("/api/messages", async (req: Request, res: Response) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json(data);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      return res.status(500).json({ error: "Erro ao buscar mensagens." });
    }
  });

  // ===============================
  // CRIAR MENSAGEM (Supabase)
  // ===============================
  app.post("/api/messages", async (req: Request, res: Response) => {
    try {
      const { name, message } = req.body as { name?: string; message?: string };

      const ip = getClientIp(req);
      const now = Date.now();

      const cleanName = (name || "").trim();
      const cleanMessage = (message || "").trim();

      if (!cleanName || !cleanMessage) {
        return res.status(400).json({ error: "Preencha nome e mensagem." });
      }

      if (cleanName.length < 2) {
        return res.status(400).json({ error: "O nome precisa ter pelo menos 2 caracteres." });
      }

      if (cleanName.length > 60) {
        return res.status(400).json({ error: "O nome pode ter no máximo 60 caracteres." });
      }

      if (cleanMessage.length < 3) {
        return res.status(400).json({ error: "A mensagem está muito curta." });
      }

      if (cleanMessage.length > 500) {
        return res.status(400).json({ error: "A mensagem pode ter no máximo 500 caracteres." });
      }

      const lastTime = lastMessageByIp.get(ip);
      if (lastTime && now - lastTime < 30000) {
        return res.status(429).json({
          error: "Aguarde 30 segundos antes de enviar outra mensagem."
        });
      }

      const lastDuplicate = lastDuplicateByIp.get(ip);
      if (
        lastDuplicate &&
        lastDuplicate.text === cleanMessage.toLowerCase() &&
        now - lastDuplicate.timestamp < 300000
      ) {
        return res.status(429).json({
          error: "Mensagem repetida detectada. Aguarde um pouco antes de enviar novamente."
        });
      }

      const { error } = await supabase
        .from("messages")
        .insert([{ name: cleanName, message: cleanMessage }]);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      lastMessageByIp.set(ip, now);
      lastDuplicateByIp.set(ip, {
        text: cleanMessage.toLowerCase(),
        timestamp: now
      });

      return res.json({ success: true });
    } catch (error) {
      console.error("Erro ao criar mensagem:", error);
      return res.status(500).json({ error: "Erro ao salvar mensagem." });
    }
  });

  // ===============================
  // EXCLUIR MENSAGEM (Supabase)
  // ===============================
  app.delete("/api/messages/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const password = req.body?.password;

      if (!adminPassword) {
        return res.status(500).json({ error: "Senha de admin não configurada." });
      }

      if (!password) {
        return res.status(400).json({ error: "Senha não enviada." });
      }

      if (password !== adminPassword) {
        return res.status(401).json({ error: "Senha de administrador incorreta." });
      }

      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error("Erro ao excluir mensagem:", error);
      return res.status(500).json({ error: "Erro ao excluir mensagem." });
    }
  });

  // ===============================
  // VITE DEV SERVER
  // ===============================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));

    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();