const { verifyToken } = require('./verifyToken');
const { verifyAccess } = require('./verifyAccess');
const { varifyIsFromCode } = require('./varifyIsFromCode');


module.exports = {
    varifyIsFromCode, verifyAccess, verifyToken
}