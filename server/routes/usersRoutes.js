const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/', usersController.register_user);
router.post('/login', usersController.login_user);
router.get('/', usersController.get_users);
router.post('/:id', usersController.update_user);
router.get('/:id', usersController.get_single_user_details);

module.exports = router;
