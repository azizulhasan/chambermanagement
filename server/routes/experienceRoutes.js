const express = require('express');
const experienceController = require('../controllers/experienceController');

const router = express.Router();

router.get('/', experienceController.experience_index);
router.post('/', experienceController.experience_create_post);
router.post('/:id', experienceController.experience_update_post);
router.get('/:id', experienceController.experience_details);
router.delete('/:id', experienceController.experience_delete_post);

module.exports = router;
