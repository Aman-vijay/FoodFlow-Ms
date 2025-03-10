const jwt = require('jsonwebtoken');
const jwtSecret = "Haha";

const fetchUserDetails = (req, res, next) => {
    const token = req.header('auth-token');
    
    if (!token) {
        return res.status(401).send({ error: "Invalid Auth Token" });
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid Auth Token" });
    }
};

module.exports = fetchUserDetails;
