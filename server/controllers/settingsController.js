const Settings = require('../models/settings');

/**
 * Display all settings content.
 * @param {Object} req for getting all settings content.
 * @param {Object} res
 */
const settings_index = (req, res) => {
    Settings.find()
        .sort({ createdAt: -1 })

        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Display single setting details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const settings_details = (req, res) => {
    const id = req.params.id;
    Settings.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};
/**
 * Save the setting to databse.
 * @param {Object} req setting save request.
 * @param {Object} res
 */
const settings_create_post = (req, res) => {
    // return;
    const settings = new Settings({
        ...req.body,
    });
    settings
        .save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Uplate the setting to databse.
 * @param {Object} req setting save request.
 * @param {Object} res
 */
const settings_update_post = (req, res) => {
    const id = req.params.id;
    Settings.findOneAndUpdate(
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
        (err, setting) => {
            if (!err) {
                res.json(setting);
            } else {
                console.log(err);
            }
        }
    );
};

/**
 * login to dashboard.
 * @param {Object} req login save request.
 * @param {Object} res
 */
const login_to_dashboard = (req, res) => {
    Settings.find()
        .sort({ _id: -1 })
        .then((result) => {
            if (result.length) {
                if (
                    req.body.email === result[0].email &&
                    req.body.password === result[0].password
                ) {
                    res.json({ data: true });
                } else {
                    res.json({ data: false });
                }
            } else {
                res.json({ data: false });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    settings_index,
    settings_details,
    settings_create_post,
    settings_update_post,
    login_to_dashboard,
};
