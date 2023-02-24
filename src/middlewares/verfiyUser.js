const User = require('../../models/User');

const verifyUser = async (req, res, next) => {
    try {
        const { email } = req.method === "GET" ? req.query : req.body;
        let exist = await User.findOne({ email });
        if (!exist) return res.status(404).send({ error: "user not founded" });
        next();
    } catch (err) {
        return res.status(404).send({ error: "Authentication Error." })
    }
}
module.exports = verifyUser