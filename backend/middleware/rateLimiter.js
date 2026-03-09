
import ratelimit from '../config/upstash.js';
const rateLimiter= async (req,res,next)=>{
    try {
        const { success } = await ratelimit.limit("identifier");

        if (!success) {
            return res.status(429).json({message: "Unable to process at this time"})
           
          }
          next();
    } catch (error) {
        console.log("rate limit error",error)
        next(error);
        
    }
};
export default rateLimiter;