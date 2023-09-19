import JWT from 'jsonwebtoken';
import { JwtPayload } from '../types/types';

export function createJwtToken (payload:JwtPayload): string | undefined {
    console.log('createJwtToken entry')
    try {
        const JWT_SECRET = process.env.JWT_SECRET_KEY as string
        const token = JWT.sign(payload,JWT_SECRET,{expiresIn:'7d'});
        console.log('createJwtToken exit');
        return token   
    } catch (error:any) {
        console.log(error?.message);
    }
}