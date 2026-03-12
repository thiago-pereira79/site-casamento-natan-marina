import { VercelRequest, VercelResponse } from '@vercel/node'

let messages: any[] = []

export default function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method === 'GET') {
    return res.status(200).json(messages)
  }

  if (req.method === 'POST') {
    const { name, message } = req.body

    const newMessage = {
      id: Date.now(),
      name,
      message,
      created_at: new Date()
    }

    messages.unshift(newMessage)

    return res.status(200).json(newMessage)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query

    messages = messages.filter(m => m.id != id)

    return res.status(200).json({ success: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}