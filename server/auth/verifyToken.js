const { verify } = require('jsonwebtoken');
const { config } = require('./config')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * @see https://www.toptal.com/json/jwt-nodejs-security
 */
const verifyToken = (req, res, next) => {
    // Get the JWT from the request header.
    const token = req.headers['authorization'];
    let jwtPayload;

    // Validate the token and retrieve its data.
    try {
        // Verify the payload fields.
        jwtPayload = verify(token?.split(' ')[1], config.jwt.secret, {
            complete: true,
            audience: config.jwt.audience,
            issuer: config.jwt.issuer,
            algorithms: ['HS256'],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false
        });
        // Add the payload to the request so controllers may access it.
        (req).token = jwtPayload;
    } catch (error) {
        res.status(401)
            .type('json')
            .send(JSON.stringify({ message: 'Missing or invalid token' }));
        return;
    }

    // Pass programmatic flow to the next middleware/controller.
    next();
};

module.exports = { verifyToken };