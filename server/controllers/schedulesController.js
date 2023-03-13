const Schedules = require('../models/schedules');


const getAllScedules = async () => {
    return await Schedules.find().sort({ createdAt: -1 });
}
/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const schedules_index = async (req, res) => {
    let schedules = await getAllScedules();

    res.json({ data: schedules });
};

/**
 * Display single schedules details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const schedules_details = (req, res) => {
    const id = req.params.id;
    Schedules.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};

/**
 * Save the schedules to databse and save image to "uploads" folder.
 * @param {Object} req schedules save request.
 * @param {Object} res
 */
const schedules_create_post = (req, res) => {
    const schedule = new Schedules({
        ...req.body,
    });
    schedule
        .save()
        .then(async (result) => {
            let schedules = await getAllScedules();
            res.json({ data: schedules });
        })
        .catch((err) => {
            res.json(err);
        });
};

/**
 * Uplate the schedules to databse and save image to "uploads" folder.
 * @param {Object} req schedules save request.
 * @param {Object} res
 */
const schedules_update_post = (req, res) => {
    const id = req.params.id;
    Schedules.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $set: req.body,
        },
        {
            new: true,
        },
        async (err, post) => {
            if (!err) {
                let schedules = await getAllScedules() ?? [];
                res.json({ data: schedules });
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
const schedules_delete_post = (req, res) => {
    const id = req.params.id;

    Schedules.deleteOne({ _id: id }, async function (err) {
        if (!err) {
            let schedules = await getAllScedules() ?? [];
            res.json({ data: schedules });
        } else {
            res.json({ data: 'Something wen wrong' });
        }
    });
};

module.exports = {
    schedules_index,
    schedules_details,
    schedules_create_post,
    schedules_update_post,
    schedules_delete_post,
};
