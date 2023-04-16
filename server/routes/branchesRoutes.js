const express = require('express');
const branchesController = require('../controllers/branchesController');

const router = express.Router();

router.get('/', branchesController.branches_index);
router.post('/', branchesController.branches_create_post);
router.put('/', branchesController.branches_update_post);
router.get('/:id', branchesController.branches_details);
router.delete('/:id', branchesController.branches_delete_post);

module.exports = router;
