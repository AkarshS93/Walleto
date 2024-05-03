// JWT verification middleware
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authData = req.headers.authorization;
    const token = authData.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, 'our_secret_key', (err, decoded) => {
    
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};
