const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.get('/', contactController.contact_index);
router.post('/', contactController.contact_create_post);
router.post('/:id', contactController.contact_update_post);
router.get('/:id', contactController.contact_details);

module.exports = router;
