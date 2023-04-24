const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader.startsWith('Bearer ')) {

        return res.status(401).send({
            success: false,
            message: 'Authenticated Error. Please try again.'
        });

    };

    const userToken = authHeader.split(' ')[1];

    try {

        const payload = jwt.verify(userToken, process.env.JWT_SECRET);

        req.body.user = payload.userId;

        next();

    } catch (error) {

        res.status(401).send({
            success: false,
            message: 'Authenticated Error. Please try again.'
        });

    }
}


module.exports = {
    auth
};