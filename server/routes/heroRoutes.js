const express = require('express');
const heroController = require('../controllers/heroController');

const router = express.Router();

router.get('/', heroController.hero_index);
router.post('/', heroController.hero_create_post);
router.post('/:id', heroController.hero_update_post);
router.get('/:id', heroController.hero_details);

module.exports = router;
