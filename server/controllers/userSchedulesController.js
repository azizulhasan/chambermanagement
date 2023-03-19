const UserSchedule = require('../models/userSchedules');

const getAllScedules = async () => {
    return await UserSchedule.find().sort({ createdAt: -1 });
};
/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const userSchedule_index = async (req, res) => {
    let userschedule = await getAllScedules();

    res.json({ data: userschedule });
};

/**
 * Display single userschedule details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const userSchedule_details = (req, res) => {
    const id = req.params.id;
    console.log({ id });
    UserSchedule.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};

/**
 * Save the userschedule to databse.
 * @param {Object} req userschedule save request.
 * @param {Object} res
 */
const userSchedule_create_post = (req, res) => {
    const schedule = new UserSchedule({
        ...req.body,
    });
    console.log(req.body)
    schedule
        .save()
        .then(async (result) => {
            let userschedule = await getAllScedules();
            res.json({ data: userschedule });
        })
        .catch((err) => {
            res.json(err);
        });
};

/**
 * Uplate the userschedule to databse.
 * @param {Object} req userschedule save request.
 * @param {Object} res
 */
const userSchedule_update_post = (req, res) => {
    console.log({ req });
    const id = req.params.id;
    UserSchedule.findOneAndUpdate(
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
                let userschedule = (await getAllScedules()) ?? [];
                res.json({ data: userschedule });
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
const userSchedule_delete_post = (req, res) => {
    const id = req.params.id;

    UserSchedule.deleteOne({ _id: id }, async function (err) {
        if (!err) {
            let userschedule = (await getAllScedules()) ?? [];
            res.json({ data: userschedule });
        } else {
            res.json({ data: 'Something wen wrong' });
        }
    });
};

module.exports = {
    userSchedule_index,
    userSchedule_details,
    userSchedule_create_post,
    userSchedule_update_post,
    userSchedule_delete_post,
};
