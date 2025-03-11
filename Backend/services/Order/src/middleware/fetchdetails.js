// middleware/fetchdetails.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'HaHa';

const fetchDetails = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('auth-token');

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ error: 'Invalid Auth Token' });
    }

    try {
        // Verify the token and extract user information
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid Auth Token' });
    }
};

module.exports = fetchDetails;
