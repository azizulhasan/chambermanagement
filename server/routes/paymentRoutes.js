const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/', paymentController.proceed_to_pay);

module.exports = router;
