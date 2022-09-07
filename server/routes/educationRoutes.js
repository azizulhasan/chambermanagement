const express = require('express');
const educationController = require('../controllers/educationController');

const router = express.Router();


router.get('/', educationController.education_index);
router.post('/',  educationController.education_create_post);
router.post('/:id', educationController.education_update_post);
router.get('/:id', educationController.education_details);
router.delete('/:id', educationController.education_delete_post);

module.exports = router;
