const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/register', usersController.register_user);
router.post('/user_from_schedule', usersController.user_from_schedule);
router.post('/', usersController.register_user_from_dashboard);
router.post('/login', usersController.login_user);
router.get('/', usersController.get_users);
router.put('/', usersController.update_user);
router.put('/from_user_panel', usersController.upate_user_from_user_panel);
router.get('/:id', usersController.get_single_user_details);
router.delete('/:id', usersController.delete_user);

module.exports = router;
