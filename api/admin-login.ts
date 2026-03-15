export default async function handler(req: any, res: any) {

  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  return res.json({ success: true });
}