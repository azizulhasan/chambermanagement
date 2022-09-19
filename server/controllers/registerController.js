const Register = require("../models/register")
const axios = require('axios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


let refreshTokens = [];

const getRefreshToken =  (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).json("You are not authenticated!")
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, process.env.AUTH_TOKEN_REFRESH_KEY, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
}
// role, name, id
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, userRole: user.userRole }, process.env.AUTH_TOKEN_SECRET_KEY, {
    expiresIn: '100s',
  });
};


const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, userRole: user.userRole }, process.env.AUTH_TOKEN_REFRESH_KEY);
};

/**
 * register user.
 * @param {Object} req for getting all register content.
 * @param {Object} res
 */
const register_user = async (req, res) => {
  //Destructuring response token from request body
  let {token} = req.body;

  //sends secret key and response token to google
  let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`);
  // check response status and send back to the client-side
  if (response.data.success == true) {
      delete req.body.token
      
  const newPassword = await bcrypt.hash(req.body.password, 10)
    
      const user = await Register.findOne({email: req.body.email})
      if (user) {
        res.json({status: false, message: 'Email address already exists.', data: null})
      }else{
        let userData = {...req.body, ...{password: newPassword, confirmPassword: newPassword}};
        let newUser = new Register(userData)
        newUser.save().then(result => {
          res.json({status: true, data: result})
        }).catch(err=>{
          console.log(err)
        })
      }
  }else{
    res.json({status: false, message: 'Captcha is not valide', data: null})
  }
};

/**
 * Display all register content.
 * @param {Object} req for getting all register content.
 * @param {Object} res
 */
const login_user = async (req, res) => {
  const user = await Register.findOne({
    email: req.body.email,
  })

	if (!user) {
		return res.json({ status: false, message: 'User not found', data: null})
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    return res.json({
      status: true,
      message: 'Login successful.',
      data: {
        email: user.email,
        userRole: user.userRole,
        accessToken,
        refreshToken,
      }
    });
	} else {
		return res.json({ status: false, message: 'email or password wrong', data: null })
	}
};




/**
 * Display all register content.
 * @param {Object} req for getting all register content.
 * @param {Object} res
 */
const register_index = (req, res) => {
  Register.find()
    .sort({ createdAt: -1 })

    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Display single register details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const register_details = (req, res) => {
  const id = req.params.id;
  Register.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};


/**
 * Uplate the register to databse.
 * @param {Object} req register save request.
 * @param {Object} res
 */
const register_update_post = (req, res) => {
  const id = req.params.id;
  Register.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
    },
    (err, register) => {
      if (!err) {
        res.json(register);
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getRefreshToken,
  register_user,
  login_user,
  register_index,
  register_details,
  register_update_post
}