import bcrypt from 'bcrypt';
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { _id, newHashedPassword } = req.body;
  const login_hashedPassword = await bcrypt.hash(newHashedPassword, 12);
  
  try {
    const updatedAccount = await prisma.user.update({
      where: {
        id: _id, 
      },
      data: {
        login_hashedPassword
      },
    });

    if (updatedAccount) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
