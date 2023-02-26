const Skills = require('../models/skills');

/**
 * Display all skills content.
 * @param {Object} req for getting all skills content.
 * @param {Object} res
 */
const skill_index = (req, res) => {
    Skills.find()
        .sort({ createdAt: -1 })

        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Display single skill details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const skill_details = (req, res) => {
    const id = req.params.id;
    Skills.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
};
/**
 * Save the skill to databse.
 * @param {Object} req skill save request.
 * @param {Object} res
 */
const skill_create_post = (req, res) => {
    // return;
    const skills = new Skills({
        ...req.body,
    });
    skills
        .save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Uplate the skill to databse.
 * @param {Object} req skill save request.
 * @param {Object} res
 */
const skill_update_post = (req, res) => {
    const id = req.params.id;
    Skills.findOneAndUpdate(
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
        (err, skill) => {
            if (!err) {
                res.json(skill);
            } else {
                console.log(err);
            }
        }
    );
};

module.exports = {
    skill_index,
    skill_details,
    skill_create_post,
    skill_update_post,
};
