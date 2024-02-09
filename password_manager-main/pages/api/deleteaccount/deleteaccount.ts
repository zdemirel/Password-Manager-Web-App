import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { userId } = req.body;
  
  try {
    const deletedAccount = await prisma.accounts.delete({
      where: {
        id: userId, 
      },
    });

    if (deletedAccount) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
