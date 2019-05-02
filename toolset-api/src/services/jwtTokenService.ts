import { TokenService } from '@/models/types/interfaces';
import { injectable } from 'inversify';
import { sign, verify } from 'jsonwebtoken';
import { TokenClaims } from '@/models/types/types';

@injectable()
export default class JwtTokenService implements TokenService {
    public generateToken(claims: TokenClaims): string {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET env variable needs to be set');
        }
        return sign(claims, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        });
    }

    public verifyToken(token: string): TokenClaims {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET env variable needs to be set');
        }
        return verify(token, process.env.JWT_SECRET) as TokenClaims;
    }
}
