const jwt = require('jsonwebtoken');

const auth = (req, res,next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).send({ matchMedia: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    }
    catch(err) {
        res.status(401).send({ message: 'Invalid token.' });
    }
}

module.exports = auth;