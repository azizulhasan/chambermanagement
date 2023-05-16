
/**
 * Varify request is from code
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * @see https://www.toptal.com/json/jwt-nodejs-security
 */
const varifyIsFromCode = (req, res, next) => {

    let headers = req.headers
    let isFromCode = false;
    // 'sec-fetch-mode': 'cors',
    // this header should have and should be value 'cors'
    if (headers.hasOwnProperty('sec-fetch-mode') && headers['sec-fetch-mode'] === 'cors') {
        isFromCode = true
    }

    //'sec-fetch-site': 'same-site',
    // this header exist and value should be  "same-site"
    if (headers.hasOwnProperty('sec-fetch-site') && headers['sec-fetch-site'] === 'same-site') {
        isFromCode = true
    }
    if (isFromCode) {
        next();
    } else {
        res.status('401').json("You don't have access")
    }
};

module.exports = { varifyIsFromCode };