const express = require('express');
const userSchedulesController = require('../controllers/userSchedulesController');

const router = express.Router();

router.post('/', userSchedulesController.userSchedule_create_post);
router.get('/', userSchedulesController.userSchedule_index);
router.put('/:id', userSchedulesController.userSchedule_update_post);
router.get('/:id', userSchedulesController.userSchedule_details);
router.delete('/:id', userSchedulesController.userSchedule_delete_post);
router.get(
    '/doctorschedules/:doctor_id',
    userSchedulesController.get_doctor_schedules
);
router.get(
    '/userschedules/:user_id',
    userSchedulesController.get_user_schedules
);

module.exports = router;
