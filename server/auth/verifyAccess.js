const Users = require('../models/users');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * @see https://www.toptal.com/json/jwt-nodejs-security
 */
const verifyAccess = (req, res, next) => {
    let id = req.headers.id
    if (id) {
        Users.findById(id)
            .then((result) => {
                if (result.userRole !== 'ADMIN') {
                    res.status('401').json("Don't have access")
                }
            })
            .catch((err) => {
                res.json(err);
            });
    }


    next();
};

module.exports = { verifyAccess };