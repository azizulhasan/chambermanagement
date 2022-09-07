const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();


router.get('/', teamController.team_index);
router.post('/',  teamController.team_create_post);
router.post('/:id', teamController.team_update_post);
router.get('/:id', teamController.team_details);
router.delete('/:id', teamController.team_delete_post);


module.exports = router;
