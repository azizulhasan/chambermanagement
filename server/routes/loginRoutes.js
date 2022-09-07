const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();


router.get('/', loginController.login_index);
router.post('/:id', loginController.login_update_post);
router.get('/:id', loginController.login_details);

module.exports = router;
