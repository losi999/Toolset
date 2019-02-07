import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { ForbiddenResponse, UnauthorizedResponse } from '../models/types/controllerResponses';
import { ControllerRequest } from '../models/types/controllerRequest';

@injectable()
export default class AuthController {
    public authorize(...roles: string[]): (req: ControllerRequest<undefined>) => Promise<UnauthorizedResponse | ForbiddenResponse | void> {
        return async (req) => {
            const token = req.headers.authorization;
            if (!token) {
                return {
                    statusCode: 401,
                    body: {
                        error: 'Missing token',
                    },
                };
            }
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as any;
                if (!roles.includes(decoded.role)) {
                    return {
                        statusCode: 403,
                        body: {
                            error: 'Forbidden',
                        },
                    };
                }
            } catch (error) {
                return {
                    statusCode: 401,
                    body: {
                        error: 'Invalid or expired token',
                    },
                };
            }
        };
    }
}
