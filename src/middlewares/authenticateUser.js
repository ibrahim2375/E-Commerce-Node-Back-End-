const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode
        next();
    } catch (error) {
        return res.status(404).send({ error: "authentiction faild" });
    }
}
module.exports = authenticate