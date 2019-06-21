import { injectable, inject } from 'inversify';
import { UnauthorizedResponse, ForbiddenResponse } from '@/models/types/controllerResponses';
import { ControllerActionType } from '@/models/types/controllerRequest';
import { TokenService } from '@/models/types/interfaces';
import { INJECTABLES } from '@/models/types/types';

@injectable()
export default class AuthController {
    constructor(
        @inject(INJECTABLES.tokenService) private tokenService: TokenService,
    ) { }

    public authorize(...roles: string[]): ControllerActionType<UnauthorizedResponse | ForbiddenResponse | void, undefined> {
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
