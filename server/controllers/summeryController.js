const Summery = require("../models/summery");

/**
 * Display all summery content.
 * @param {Object} req for getting all summery content.
 * @param {Object} res
 */
const summery_index = (req, res) => {
  Summery.find()
    .sort({ createdAt: -1 })

    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Display single summery details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const summery_details = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Summery.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
/**
 * Save the summery to databse.
 * @param {Object} req summery save request.
 * @param {Object} res
 */
const summery_create_post = (req, res) => {

  console.log(req.body)
  // return;
  const summery = new Summery({
    ...req.body,
  });
  summery
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Uplate the summery to databse.
 * @param {Object} req summery save request.
 * @param {Object} res
 */
const summery_update_post = (req, res) => {
  const id = req.params.id;
  Summery.findOneAndUpdate(
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
    (err, summery) => {
      if (!err) {
        res.json(summery);
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  summery_index,
  summery_details,
  summery_create_post,
  summery_update_post,
};
