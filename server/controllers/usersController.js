const Users = require("../models/users")
const axios = require('axios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const { uploadImage, getImagePath } = require('../utilities/utilities')


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
  return jwt.sign({ id: user._id, userRole: user.userRole, name: user.name }, process.env.AUTH_TOKEN_SECRET_KEY, {
    expiresIn: '200s',
  });
};


const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, userRole: user.userRole, name: user.name }, process.env.AUTH_TOKEN_REFRESH_KEY);
};

/**
 * User register from frontend.
 * @param {Object} req.
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
    
      const user = await Users.findOne({email: req.body.email})
      if (user) {
        res.json({status: false, message: 'Email address already exists.', data: null})
      }else{
        let userData = {...req.body, ...{password: newPassword}};
        let newUser = new Users(userData)
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

const uploads = uploadImage();

/**
 * Save the user to databse and save image to "uploads" folder.
 * @param {Object} req blog save request.
 * @param {Object} res
 */
const register_user_from_dashboard = (req, res) => {
  uploads(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const users = new Users({
        ...req.body,
        ...{
          image:
            process.env.UPLOAD_FOLDER_URL + "/" + req.file.filename,
            password: req.body.phone
        },
      });
      users
        .save()
        .then((result) => {
          Users.find()
            .sort({ createdAt: -1 })
            .then((result) => {
              res.json({ data: result });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

/**
 * Display all users content.
 * @param {Object} req for getting all users content.
 * @param {Object} res
 */
const login_user = async (req, res) => {
  
  const user = await Users.findOne({
    email: req.body.email,
  })
  console.log(req.body.email)
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
        id: user._id,
        userRole: user.userRole,
        name: user.name,
        accessToken,
        refreshToken,
      }
    });
	} else {
		return res.json({ status: false, message: 'email or password wrong', data: null })
	}
};




/**
 * Display all users content.
 * @param {Object} req for getting all users content.
 * @param {Object} res
 */
const get_users = (req, res) => {
  Users.find()
    .sort({ createdAt: -1 })

    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Display single users details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const get_single_user_details = (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};


/**
 * Uplate the users to databse.
 * @param {Object} req users save request.
 * @param {Object} res
 */
const update_user = (req, res) => {
  uploads(req, res, (err) => {
    let id = req.body.id;
    if (err) {
      console.log(err.message);
    } else {
      /**
       * if new image is uploaded. then delete previous image.
       */
      if (req.file !== undefined) {
        Users.findById(id).then((result) => {
          let path = getImagePath(result.image);
          if (fs.existsSync(path)) {
            fs.unlink(path, (err) => {
              console.log(result.image + " was deleted.");
            });
          } else {
            console.log(result.image + " does not exist.");
          }
        });
      }
      /**
       * if new image is uploaded. then add new ones file name.
       */
      let update_data = {};
      if (req.file !== undefined) {
        update_data = {
          ...req.body,
          ...{
            image:
              process.env.UPLOAD_FOLDER_URL + "/" + req.file.filename,
          },
        };
      } else {
        update_data = {
          ...req.body,
        };
      }
      delete update_data.id;
      Users.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: update_data,
        },
        {
          new: true,
        },
        (err, post) => {
          if (!err) {
            Users.find()
              .sort({ createdAt: -1 })
              .then((result) => {
                res.json({ data: result });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log(err);
          }
        }
      );
    }
  });
};

/**
 * Delete user
 * @param {*} req 
 * @param {*} res 
 */
const delete_user = (req, res) => {
  const id = req.params.id;
  // Delete user image.
  Users.findById(id).then((result) => {
    let path = result.image ?  getImagePath(result.image) : "";
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        console.log(result.image + " was deleted.");
      });
    } else {
      console.log(result.image + " does not exist.");
    }
  });
  Users.deleteOne({ _id: id }, function (err) {
    if (!err) {
        // Get all users and return;
      Users.find()
        .sort({ createdAt: -1 })
        .then((result) => {
          res.json({ data: result });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({ data: "Something wen wrong" });
    }
  });
};


module.exports = {
  getRefreshToken,
  register_user,
  register_user_from_dashboard,
  login_user,
  get_users,
  get_single_user_details,
  update_user,
  delete_user
}