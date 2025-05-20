const blacklistTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const adminModel = require('../models/admin.model');

module.exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if the token is blacklisted
        const blacklisted = await blacklistTokenModel.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted please login again' });
        
        }
        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid' });
        }

        // Attach user information to the request object  
        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.isAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await adminModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.admin = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}