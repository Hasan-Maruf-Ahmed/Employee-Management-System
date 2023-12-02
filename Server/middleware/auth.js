const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).send({ message: "Access denied. You're not Authorized." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    }
    catch(err) {
        res.status(401).send({ message: 'Invalid token.', error: err.message });
    }
}

module.exports = auth;