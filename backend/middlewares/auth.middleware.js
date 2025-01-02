import jwt from "jsonwebtoken"

export const isAutenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:"User not authenticated",
                success:false
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({
                message:"Inavlid token",
                success:false
            })
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message:"Token expired",
                success:false
            })
        }
        return res.status(500).json({
            message:"Internal server error during authentication",
            success:false
        })
    }
}
    
