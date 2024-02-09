import { NextApiRequest, NextApiResponse } from "next";
import * as crypto from 'crypto';
import serverAuth from "@/libs/serverAuth"; 
import prisma from "@/libs/prismadb";

// Şifreleme anahtarı, doğrudan kullanıcıdan alınan şifre olacak
const PASSWORD_AS_KEY: string = process.env.PASSWORD_AS_KEY || '';

// Şifreleme işlemi
async function encryptString(toEncrypt: string): Promise<string | null> {
    try {
        // Kullanıcıdan alınan şifreyi doğrudan anahtar olarak kullan
        const key = crypto.createHash('sha256').update(PASSWORD_AS_KEY).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv('aes-256-ecb', key, Buffer.alloc(0)); // IV kullanmak gerekmediği için null yerine Buffer.alloc(0) kullandım
        let encryptedData = cipher.update(toEncrypt, 'utf-8', 'base64');
        encryptedData += cipher.final('base64');
        return encryptedData;
    } catch (error) {
        console.error('Encryption error:', error); 
        return null;
    }
}

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const { website, username, password } = req.body;
        
        // Kullanıcıdan alınan şifreyi anahtar olarak kullanarak şifrele
        const hashedPassword = await encryptString(password);
        if (!hashedPassword) {
            res.status(500).json({ success: false, message: 'Encryption failed' });
            return;
        }
      
        const accounts = await prisma.accounts.create({
            data: {
                userId: currentUser.id,
                website,
                username,
                hashedPassword
            }
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error); 
        res.status(400).end();
    }
}
