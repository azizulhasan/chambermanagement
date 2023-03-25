const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/', paymentController.proceed_to_pay);
router.post('/success', paymentController.payment_success);
router.post('/fail', paymentController.payment_fail);
router.post('/cancel', paymentController.payment_cancel);



module.exports = router;
