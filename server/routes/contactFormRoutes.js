const express = require('express');
const contactFormController = require('../controllers/contactFormController');

const router = express.Router();

router.get('/', contactFormController.contact_form_index);
router.post('/', contactFormController.contact_form_create_post);
router.post('/:id', contactFormController.contact_form_update_post);
router.get('/:id', contactFormController.contact_form_details);
router.delete('/:id', contactFormController.contact_form_delete_post);

module.exports = router;
