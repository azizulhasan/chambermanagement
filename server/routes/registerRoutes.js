const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.post('/', registerController.register_user);
router.get('/', registerController.register_index);
router.post('/:id', registerController.register_update_post);
router.get('/:id', registerController.register_details);

module.exports = router;
