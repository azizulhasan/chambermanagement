const Experience = require('../models/experience');

/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const experience_index = (req, res) => {
    Experience.find()
        .sort({ createdAt: -1 })

        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Display single experience details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const experience_details = (req, res) => {
    const id = req.params.id;
    Experience.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};

/**
 * Save the experience to databse and save image to "uploads" folder.
 * @param {Object} req experience save request.
 * @param {Object} res
 */
const experience_create_post = (req, res) => {
    const experience = new Experience({
        ...req.body,
    });
    experience
        .save()
        .then((result) => {
            Experience.find()
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
 * Uplate the experience to databse and save image to "uploads" folder.
 * @param {Object} req experience save request.
 * @param {Object} res
 */
const experience_update_post = (req, res) => {
    const id = req.params.id;
    Experience.findOneAndUpdate(
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
                Experience.find()
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
const experience_delete_post = (req, res) => {
    const id = req.params.id;

    Experience.deleteOne({ _id: id }, function (err) {
        if (!err) {
            Experience.find()
                .sort({ createdAt: -1 })
                .then((result) => {
                    res.json({ data: result });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            res.json({ data: 'Something wen wrong' });
        }
    });
};

module.exports = {
    experience_index,
    experience_details,
    experience_create_post,
    experience_update_post,
    experience_delete_post,
};
