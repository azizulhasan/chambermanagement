const express = require('express');
const summeryController = require('../controllers/summeryController');

const router = express.Router();


router.get('/', summeryController.summery_index);
router.post('/',  summeryController.summery_create_post);
router.post('/:id', summeryController.summery_update_post);
router.get('/:id', summeryController.summery_details);

module.exports = router;
