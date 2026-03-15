import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {

  if (req.method === "GET") {

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  }

  if (req.method === "POST") {

    const { name, message } = req.body;

    const { error } = await supabase
      .from("messages")
      .insert([{ name, message }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ success: true });
  }

}