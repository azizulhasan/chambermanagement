const Register = require("../models/register")


/**
 * Display all register content.
 * @param {Object} req for getting all register content.
 * @param {Object} res
 */
const register_user = (req, res) => {
      let user = new Register({...req.body})
      user.save().then(result => {
        res.json({status: true, data: result})
      }).catch(err=>{
        console.log(err)
      })
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
  register_index,
  register_details,
  register_update_post,
};
