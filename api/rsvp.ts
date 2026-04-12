export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { name, phone, email, guests, attending } = req.body;

  console.log("RSVP recebido:", {
    name,
    phone,
    guests,
    attending
  });

  return res.json({ success: true });
}