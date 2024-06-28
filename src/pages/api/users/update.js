import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, email } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { name, email },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'User update failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
