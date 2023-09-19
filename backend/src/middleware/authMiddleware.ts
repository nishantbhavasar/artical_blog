import { NextFunction, Request, Response, request } from "express";
import JWT  from "jsonwebtoken";

export function verifyJwtToken(req:Request,res:Response,next:NextFunction): any{
    console.log('varifyJwtToken entry');
    try {
        let token:string = req?.cookies?.token || req?.headers?.authorization;
        token = token?.replace('Bearer ','');
        if(!token){
            console.error('jwt must be provided');
            return res.status(403).send( {
                status:403,
                message:"Unauthorized Access"
            })
        }
        const JWT_SECRET = process.env.JWT_SECRET_KEY as string
        const payload = JWT.verify(token,JWT_SECRET);
        console.log('User Atuhenticated');
        req.headers.authorization = token
        console.log('varifyJwtToken exit');
        next();
    } catch (error:any) {
        console.error(error?.message);
        return  res.status(error?.status || 500).send( {
            status:error?.status || 500,
            message:error?.message || "Internal Server Error"
        })
    }
}