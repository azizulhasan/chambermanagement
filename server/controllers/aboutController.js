const About = require('../models/about');
const multer = require('multer');
const fs = require('fs');
const { getImagePath } = require('../utilities/utilities');

/**
 * Display all about content.
 * @param {Object} req for getting all about content.
 * @param {Object} res
 */
const about_index = (req, res) => {
    About.find()
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
const about_details = (req, res) => {
    const id = req.params.id;
    About.findById(id)
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
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const uploads = multer({
    storage: Storage,
}).single('portfolioImage');

/**
 * Save the blog to databse and save image to "uploads" folder.
 * @param {Object} req blog save request.
 * @param {Object} res
 */
const about_create_post = (req, res) => {
    uploads(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const about = new About({
                ...req.body,
                ...{
                    portfolioImage:
                        process.env.UPLOAD_FOLDER_URL + '/' + req.file.filename,
                },
            });
            about
                .save()
                .then((result) => {
                    res.json(result);
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
const about_update_post = (req, res) => {
    const id = req.params.id;

    uploads(req, res, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            /**
             * if new image is uploaded. then delete previous image.
             */
            if (req.file !== undefined) {
                About.findById(id).then((result) => {
                    let path = getImagePath(result.portfolioImage);
                    if (fs.existsSync(path)) {
                        fs.unlink(path, (err) => {
                            if (err) throw err;
                            console.log(
                                result.portfolioImage + ' was deleted.'
                            );
                        });
                    } else {
                        console.log(result.portfolioImage + ' does not exist.');
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
                        portfolioImage:
                            process.env.UPLOAD_FOLDER_URL +
                            '/' +
                            req.file.filename,
                    },
                };
            } else {
                update_data = {
                    ...req.body,
                };
            }

            About.findOneAndUpdate(
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
                        res.json(post);
                    } else {
                        console.log(err);
                    }
                }
            );
        }
    });
};

module.exports = {
    about_index,
    about_details,
    about_create_post,
    about_update_post,
};
