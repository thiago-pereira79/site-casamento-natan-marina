import { supabase } from '../src/lib/supabase'

export default async function handler(req, res) {

  // BUSCAR MENSAGENS
  if (req.method === 'GET') {

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  // CRIAR MENSAGEM
  if (req.method === 'POST') {

    const { name, message } = req.body

    const { data, error } = await supabase
      .from('messages')
      .insert([
        { name, message }
      ])

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  // EXCLUIR MENSAGEM
  if (req.method === 'DELETE') {

    const { id } = req.body

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ success: true })
  }
}
