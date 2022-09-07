const express = require('express');
const skillsController = require('../controllers/skillsController');

const router = express.Router();


router.get('/', skillsController.skill_index);
router.post('/',  skillsController.skill_create_post);
router.post('/:id', skillsController.skill_update_post);
router.get('/:id', skillsController.skill_details);

module.exports = router;
