const UserSchedule = require('../models/userSchedules');
const { sendMail } = require('../mail')

const getAllScedules = async () => {
    return await UserSchedule.find().sort({ createdAt: -1 });
};
/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const userSchedule_index = async (req, res) => {
    let userschedules = await getAllScedules();

    res.json({ data: userschedules });
};

const get_doctor_schedules = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    let doctorSchedules = await UserSchedule.find({
        _id: doctor_id,
    }).sort({ createdAt: -1 });
    res.json({ data: doctorSchedules });
};

const get_user_schedules = async (req, res) => {
    const user_id = req.params.user_id;
    let userSchedules = await UserSchedule.find({
        user_id,
    }).sort({ createdAt: -1 });
    res.json({ data: userSchedules });
};

/**
 * Display single userschedule details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const userSchedule_details = (req, res) => {
    const id = req.params.id;
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
    schedule
        .save()
        .then(async (result) => {
            sendMail(req.body);
            res.json({ data: result });
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
    get_doctor_schedules,
    get_user_schedules,
};
