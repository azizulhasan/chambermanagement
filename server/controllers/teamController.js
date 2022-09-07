const Team = require("../models/team");
const multer = require("multer");
const fs = require("fs");
const { getImagePath } = require("../utilities/utilities");

/**
 * Display all team content.
 * @param {Object} req for getting all team content.
 * @param {Object} res
 */
const team_index = (req, res) => {
  Team.find()
    .sort({ createdAt: -1 })

    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Display single blog details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const team_details = (req, res) => {
  const id = req.params.id;
  Team.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
/**
 * Store image to "uploads" folder. after modifiying image namge.
 *
 */

const Storage = multer.diskStorage({
  destination: process.env.UPLOAD_FOLDER,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const uploads = multer({
  storage: Storage,
}).single("image");

/**
 * Save the blog to databse and save image to "uploads" folder.
 * @param {Object} req blog save request.
 * @param {Object} res
 */
const team_create_post = (req, res) => {

  uploads(req, res, (err) => {

    if (err) {
      console.log(err);
    } else {
      const team = new Team({
        ...req.body,
        ...{
          image:
            process.env.UPLOAD_FOLDER_URL + "/" + req.file.filename,
        },
      });
      team
        .save()
        .then((result) => {
          Team.find()
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
 * Uplate the blog to databse and save image to "uploads" folder.
 * @param {Object} req blog save request.
 * @param {Object} res
 */
const team_update_post = (req, res) => {
  const id = req.params.id;

  uploads(req, res, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      /**
       * if new image is uploaded. then delete previous image.
       */
      if (req.file !== undefined) {
        Team.findById(id).then((result) => {
          let path = getImagePath(result.image);
          if (fs.existsSync(path)) {
            fs.unlink(path, (err) => {
              if (err) throw err;
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

      Team.findOneAndUpdate(
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
            Team.find()
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
 * Delete post
 * @param {*} req
 * @param {*} res
 */
const team_delete_post = (req, res) => {
  const id = req.params.id;
  Team.deleteOne({ _id: id }, function (err) {
    if (!err) {
      Team.find()
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
  team_index,
  team_details,
  team_create_post,
  team_update_post,
  team_delete_post,
};
