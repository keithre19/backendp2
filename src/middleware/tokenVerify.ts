import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret', async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }

        req.body.user = user; // Asignar el usuario autenticado a req.user
        next();
    });
};

export default authenticateToken;