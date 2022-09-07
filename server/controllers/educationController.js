const Education = require("../models/education");

/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const education_index = (req, res) => {
  Education.find()
    .sort({ createdAt: -1 })

    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Display single education details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const education_details = (req, res) => {
  const id = req.params.id;
  Education.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

/**
 * Save the education to databse and save image to "uploads" folder.
 * @param {Object} req education save request.
 * @param {Object} res
 */
const education_create_post = (req, res) => {
  const education = new Education({
    ...req.body,
  });
  education
    .save()
    .then((result) => {
      Education.find()
        .sort({ createdAt: -1 })

        .then((result) => {
          res.json({ data: result });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

/**
 * Uplate the education to databse and save image to "uploads" folder.
 * @param {Object} req education save request.
 * @param {Object} res
 */
const education_update_post = (req, res) => {
  const id = req.params.id;
  Education.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, post) => {
      if (!err) {
        Education.find()
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
};
/**
 * Delete post
 * @param {*} req
 * @param {*} res
 */
const education_delete_post = (req, res) => {
  const id = req.params.id;

  console.log(id);
  Education.deleteOne({ _id: id }, function (err) {
    if (!err) {
      Education.find()
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
  education_index,
  education_details,
  education_create_post,
  education_update_post,
  education_delete_post,
};
