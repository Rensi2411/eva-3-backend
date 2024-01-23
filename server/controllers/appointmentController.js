const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createAppointment = async (req, res) => {
  const { name, specialization, date, slots, fee } = req.body;

  if (!name || !specialization || !date || !slots || !fee) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const newAppointment = new Appointment({
      name,
      specialization,
      date,
      slots,
      fee,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

