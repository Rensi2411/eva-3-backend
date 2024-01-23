const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/appointments', appointmentController.getAppointments);
router.post('/appointments', appointmentController.createAppointment);

module.exports = router;
