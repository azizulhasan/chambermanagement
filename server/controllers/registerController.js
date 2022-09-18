const Register = require("../models/register")
const axios = require('axios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/**
 * register user.
 * @param {Object} req for getting all register content.
 * @param {Object} res
 */
const register_user = async (req, res) => {
  //Destructuring response token from request body
  let {token} = req.body;

  //sends secret key and response token to google
  let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`);
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
		return res.json({ status: false, message: 'User not found', token: null })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'mindtoheart2022'
		)

		return res.json({ status: true, token: token })
	} else {
		return res.json({ status: false, message: 'email or password wrong',  token: null })
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
  
  register_user,
  login_user,
  register_index,
  register_details,
  register_update_post,
};
