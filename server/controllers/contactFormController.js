const ContactForm = require('../models/contact_form');
// const {sendMail} = require('../mail')

/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const contact_form_index = (req, res) => {
    ContactForm.find()
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
    ContactForm.findById(id)
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
    const contact_form = new ContactForm({
        ...req.body,
    });
    contact_form
        .save()
        .then((result) => {
            ContactForm.find()
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
    ContactForm.findOneAndUpdate(
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
                ContactForm.find()
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

    ContactForm.deleteOne({ _id: id }, function (err) {
        if (!err) {
            ContactForm.find()
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
    contact_form_index,
    contact_form_details,
    contact_form_create_post,
    contact_form_update_post,
    contact_form_delete_post,
};
