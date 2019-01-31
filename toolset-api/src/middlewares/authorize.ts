import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send('Missing token');
        }
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as any;
            if (!roles.includes(decoded.role)) {
                res.status(403).send('Forbidden');
            }

        } catch (error) {
            res.status(400).send('Invalid or expired token');
        }
        next();
    }
};

export default authorize;