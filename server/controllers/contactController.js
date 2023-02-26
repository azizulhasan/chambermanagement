const Contact = require('../models/contact');

/**
 * Display all contact content.
 * @param {Object} req for getting all contact content.
 * @param {Object} res
 */
const contact_index = (req, res) => {
    Contact.find()
        .sort({ createdAt: -1 })

        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Display single contact details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const contact_details = (req, res) => {
    const id = req.params.id;
    Contact.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};
/**
 * Save the contact to databse.
 * @param {Object} req contact save request.
 * @param {Object} res
 */
const contact_create_post = (req, res) => {
    // return;
    const contacts = new Contact({
        ...req.body,
    });
    contacts
        .save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Uplate the contact to databse.
 * @param {Object} req contact save request.
 * @param {Object} res
 */
const contact_update_post = (req, res) => {
    const id = req.params.id;
    Contact.findOneAndUpdate(
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
        (err, contact) => {
            if (!err) {
                res.json(contact);
            } else {
                console.log(err);
            }
        }
    );
};

module.exports = {
    contact_index,
    contact_details,
    contact_create_post,
    contact_update_post,
};
