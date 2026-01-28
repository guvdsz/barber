
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "../lib/prisma";


interface Payload {
	sub: string;
	tokenVersion: number;
}


export async function validateAuth(req: Request, res: Response, next: NextFunction) {
  const requestToken = req.headers.authorization;
  if (!requestToken) {
    return res.status(401).json({ error: "Invalid token" });
  }
  const [, token] = requestToken.split(" ");
  try {
    const { sub, tokenVersion } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as Payload;
    if (!sub) {
      return res.status(401).json({ error: "Token" });
    }
    // Buscar tokenVersion do banco
    const user = await prisma.user.findUnique({ where: { id: sub }, select: { tokenVersion: true, id: true } });
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }
    if (user.tokenVersion !== tokenVersion) {
      return res.status(401).json({ error: "Token expirado" });
    }
    req.userId = sub;
    // Para controllers que usam req.user?.id
    (req as any).user = { id: sub };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
