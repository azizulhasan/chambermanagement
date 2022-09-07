const express = require('express');
const aboutController = require('../controllers/aboutController');

const router = express.Router();


router.get('/', aboutController.about_index);
router.post('/',  aboutController.about_create_post);
router.post('/:id', aboutController.about_update_post);
router.get('/:id', aboutController.about_details);

module.exports = router;
