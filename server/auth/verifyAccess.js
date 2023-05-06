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
const verifyAccess = (req, res, next) => {


    // Pass programmatic flow to the next middleware/controller.
    next();
};

module.exports = { verifyAccess };