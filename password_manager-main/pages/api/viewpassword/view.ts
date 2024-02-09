import { NextApiRequest, NextApiResponse } from "next";
import * as crypto from 'crypto';
import serverAuth from "@/libs/serverAuth"; 
import prisma from "@/libs/prismadb"; 

const PASSWORD_AS_KEY: string = process.env.PASSWORD_AS_KEY || '';

// Şifre çözme işlemi
async function decryptString(encryptedString: string): Promise<string | null> {
    try {
        const key = crypto.createHash('sha256').update(PASSWORD_AS_KEY).digest('base64').substr(0, 32);
        const decipher = crypto.createDecipheriv('aes-256-ecb', key, Buffer.alloc(0)); // IV kullanmak gerekmediği için null yerine Buffer.alloc(0) kullandım
        let decryptedData = decipher.update(encryptedString, 'base64', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    } catch (error) {
        console.error('Decryption error:', error); 
        return null; // Hata durumunda null döndür
    }
}

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).end();
        return;
    }

    const { currentUser } = await serverAuth(req, res);

    try {
        const accounts = await prisma.accounts.findMany({
            where: {
                userId: currentUser.id,
            },
            select: {
                id: true,
                website: true,
                username: true,
                hashedPassword: true,
            },
        });

        // Her bir account için hashedPassword değerini çöz
        const decryptedAccounts = await Promise.all(accounts.map(async (account) => {
            try {
                const decryptedPassword = await decryptString(account.hashedPassword || '');
                return {
                    ...account,
                    hashedPassword: decryptedPassword, // Çözülmüş şifreyi frontend'e gönder
                };
            } catch (error) {
                console.error('Error decrypting password:', error);
                return {
                    ...account,
                    hashedPassword: null, // Şifre çözülemezse null olarak işaretle
                };
            }
        }));

        return res.status(200).json(decryptedAccounts);
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}
