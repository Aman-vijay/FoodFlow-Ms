const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

const fetchDetails = (req, res, next) => {
  const token = req.header('auth-token') || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
  }

  try {
    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(cleanToken, jwtSecret);
    req.user = decoded.user || decoded; 
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

module.exports = fetchDetails;
