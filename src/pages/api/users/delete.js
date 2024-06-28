import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.user.delete({ where: { id } });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'User deletion failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
