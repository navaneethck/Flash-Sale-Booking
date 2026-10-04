import type { Request,Response,NextFunction } from "express";
import redisClient from "../src/config/redis.js";

const windowSeconds = 60;
const maxReq = 10;

export async function rateLimiter(
    req:Request,
    res:Response,
    next:NextFunction
){
    const clientIp = req.ip;
    const key = `rate-limit:${clientIp}`;
    const currentCount = await redisClient.incr(key);

    if(currentCount ===1){
      await redisClient.expire(key,windowSeconds);
    }

    if(currentCount>maxReq){
        return res.status(429).json({
            message:"Too many requests.Please try again later"
        })
    }

    next();
}