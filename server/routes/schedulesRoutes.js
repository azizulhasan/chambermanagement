const express = require('express');
const schedulesController = require('../controllers/schedulesController');

const router = express.Router();

router.post('/', schedulesController.schedules_create_post);
router.get('/', schedulesController.schedules_index);
router.put('/:id', schedulesController.schedules_update_post);
router.get('/:id', schedulesController.schedules_details);
router.delete('/:id', schedulesController.schedules_delete_post);

module.exports = router;
