import { injectable, inject } from 'inversify';
import { UnauthorizedResponse, ForbiddenResponse } from '@/models/types/controllerResponses';
import { ControllerRequest } from '@/models/types/controllerRequest';
import { TokenService } from '@/models/types/interfaces';
import { INJECTABLES } from '@/inversify.config';

@injectable()
export default class AuthController {
    constructor(
        @inject(INJECTABLES.tokenService) private tokenService: TokenService,
    ) { }

    public authorize(...roles: string[]): (req: ControllerRequest<undefined>) => Promise<UnauthorizedResponse | ForbiddenResponse | void> {
        return async (req) => {
            const token = req.headers.authorization;
            if (!token) {
                return {
                    statusCode: 401,
                };
            }
            try {
                const decoded = this.tokenService.verifyToken(token);
                if (!roles.includes(decoded.role)) {
                    return {
                        statusCode: 403,
                    };
                }
            } catch (error) {
                return {
                    statusCode: 401,
                };
            }
        };
    }
}
