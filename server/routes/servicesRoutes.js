const express = require('express');
const servicesController = require('../controllers/servicesController');

const router = express.Router();


router.get('/', servicesController.services_index);
router.post('/',  servicesController.services_create_post);
router.post('/:id', servicesController.services_update_post);
router.get('/:id', servicesController.services_details);
router.delete('/:id', servicesController.services_delete_post);


module.exports = router;
