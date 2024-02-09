import bcrypt from 'bcrypt';
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { currentPassword } = req.body;
  
  try {
    const { currentUser } = await serverAuth(req, res);
  
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id
      }
    });

    if (!user || !user.login_hashedPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const passwordsMatch = await bcrypt.compare(
      currentPassword,
      user.login_hashedPassword
    );

    if (passwordsMatch) {
      return res.status(200).json({ success: true, message: 'Password matched' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
