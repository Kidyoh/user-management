import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'User creation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
