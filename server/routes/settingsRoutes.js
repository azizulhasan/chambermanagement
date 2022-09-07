const express = require('express');
const settingsController = require('../controllers/settingsController');

const router = express.Router();

router.get('/', settingsController.settings_index);
router.post('/',  settingsController.settings_create_post);
router.post('/login',  settingsController.login_to_dashboard);
router.post('/:id', settingsController.settings_update_post);
router.get('/:id', settingsController.settings_details);

module.exports = router;
