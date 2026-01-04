const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    console.log("Auth Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err.message);
        return res.status(403).json({ message: 'Invalid token' });
      }

      console.log('Decoded token:', decoded);
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Authentication error' });
  }
}

module.exports = authenticateToken;
