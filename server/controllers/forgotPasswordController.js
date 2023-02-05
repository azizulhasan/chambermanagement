const ForgotPassword = require("../models/forgotPassword");
// const {sendMail} = require('../mail')

/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const contact_form_index = (req, res) => {
    ForgotPassword.find()
        .sort({ _id: -1 })
        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Display single contact_form details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const contact_form_details = (req, res) => {
    const id = req.params.id;
    ForgotPassword.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};

/**
 * Save the contact_form to databse and save image to "uploads" folder.
 * @param {Object} req contact_form save request.
 * @param {Object} res
 */
const contact_form_create_post = (req, res) => {
    const contact_form = new ForgotPassword({
        ...req.body,
    });
    contact_form
        .save()
        .then((result) => {
            ForgotPassword.find()
                .sort({ createdAt: -1 })

                .then((result) => {
                    res.json({ data: result });
                })
                .catch((err) => {
                    console.log(err);
                });

            // sendMail(req.body)

        })
        .catch((err) => {
            res.json(err);
        });
};

/**
 * Uplate the contact_form to databse and save image to "uploads" folder.
 * @param {Object} req contact_form save request.
 * @param {Object} res
 */
const contact_form_update_post = (req, res) => {
    const id = req.params.id;
    ForgotPassword.findOneAndUpdate(
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
                ForgotPassword.find()
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
const contact_form_delete_post = (req, res) => {
    const id = req.params.id;

    ForgotPassword.deleteOne({ _id: id }, function (err) {
        if (!err) {
            ForgotPassword.find()
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
    contact_form_index,
    contact_form_details,
    contact_form_create_post,
    contact_form_update_post,
    contact_form_delete_post,
};
