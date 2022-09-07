const Services = require("../models/services");
const multer = require("multer");
const fs = require("fs");
const { getImagePath } = require("../utilities/utilities");

/**
 * Display all services content.
 * @param {Object} req for getting all services content.
 * @param {Object} res
 */
const services_index = (req, res) => {
  Services.find()
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
const services_details = (req, res) => {
  const id = req.params.id;
  Services.findById(id)
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
const services_create_post = (req, res) => {
  uploads(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const services = new Services({
        ...req.body,
        ...{
          image:
            process.env.UPLOAD_FOLDER_URL + "/" + req.file.filename,
        },
      });
      console.log(services)
      services
        .save()
        .then((result) => {
          Services.find()
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
const services_update_post = (req, res) => {
  const id = req.params.id;

  uploads(req, res, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      /**
       * if new image is uploaded. then delete previous image.
       */
      if (req.file !== undefined) {
        Services.findById(id).then((result) => {
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

      Services.findOneAndUpdate(
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
            Services.find()
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
const services_delete_post = (req, res) => {
  const id = req.params.id;
  Services.deleteOne({ _id: id }, function (err) {
    if (!err) {
      Services.find()
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
  services_index,
  services_details,
  services_create_post,
  services_update_post,
  services_delete_post,
};
