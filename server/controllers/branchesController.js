const Branches = require('../models/branches');


/**
 * Display all branches content.
 * @param {Object} req for getting all branches content.
 * @param {Object} res
 */
const branches_index = (req, res) => {
    Branches.find()
        .sort({ createdAt: -1 })

        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Display single branch details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const branches_details = (req, res) => {
    const id = req.params.id;
    Branches.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};


/**
 * Save the branch to databse .
 * @param {Object} req branch save request.
 * @param {Object} res
 */
const branches_create_post = (req, res) => {
    const branches = new Branches({
        ...req.body,
    });
    branches
        .save()
        .then((result) => {
            Branches.find()
                .sort({ createdAt: -1 })
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Uplate the branch to databse and save image to "uploads" folder.
 * @param {Object} req branch save request.
 * @param {Object} res
 */
const branches_update_post = (req, res) => {
    let id = req.body.id;

    let update_data = {};
    update_data = {
        ...req.body,
    };
    delete update_data.id;

    Branches.findOneAndUpdate(
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
                Branches.find()
                    .sort({ createdAt: -1 })
                    .then((result) => {
                        res.json(result);
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
const branches_delete_post = (req, res) => {
    const id = req.params.id;
    Branches.deleteOne({ _id: id }, function (err) {
        if (!err) {
            Branches.find()
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
    branches_index,
    branches_details,
    branches_create_post,
    branches_update_post,
    branches_delete_post,
};
