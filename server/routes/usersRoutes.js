const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/', usersController.get_users);
router.post('/login', usersController.login_user);
router.get('/', usersController.get_user);
router.post('/:id', usersController.update_user);
router.get('/:id', usersController.get_user_details);

module.exports = router;
