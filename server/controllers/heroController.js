const Hero = require('../models/hero');
const multer = require('multer');
const fs = require('fs');
const { getImagePath } = require('../utilities/utilities');

/**
 * Display all blogs.
 * @param {Object} req for getting all blogs.
 * @param {Object} res
 */
const hero_index = (req, res) => {
    Hero.find()
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
const hero_details = (req, res) => {
    const id = req.params.id;
    Hero.findById(id)
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
}).single('backgroundImage');

/**
 * Save the blog to databse and save image to "uploads" folder.
 * @param {Object} req blog save request.
 * @param {Object} res
 */
const hero_create_post = (req, res) => {
    uploads(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const hero = new Hero({
                ...req.body,
                ...{
                    backgroundImage:
                        process.env.UPLOAD_FOLDER_URL + '/' + req.file.filename,
                },
            });
            hero.save()
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
const hero_update_post = (req, res) => {
    const id = req.params.id;

    uploads(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            /**
             * if new image is uploaded. then delete previous image.
             */
            if (req.file !== undefined) {
                Hero.findById(id).then((result) => {
                    let path = getImagePath(result.backgroundImage);
                    if (fs.existsSync(path)) {
                        fs.unlink(path, (err) => {
                            if (err) throw err;
                            console.log(
                                result.backgroundImage + ' was deleted.'
                            );
                        });
                    } else {
                        console.log(
                            result.backgroundImage + ' does not exist.'
                        );
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
                        backgroundImage:
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

            Hero.findOneAndUpdate(
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
    hero_index,
    hero_details,
    hero_create_post,
    hero_update_post,
};
