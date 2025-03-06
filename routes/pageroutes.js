// //imports

// const express = require('express');
// const path = require('path');
// const { isAuthenticated } = require('../middlewares/auth');

// const router = express.Router();


// // Serving static pages

// //serving registration page
// router.get('/auth', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'auth.html'));
// });

// // Serving loging page
// router.get('', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

// router.get('/registration', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'registration.html'));
// });

// router.get('/doctor', isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'doctor.html'));
// });

// router.get('/caregiver', isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'caregiver.html'));
// });

// router.get('/patient', isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'patient.html'));
// });

// router.get('//', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', '/.html'));
// });



// module.exports = router;


const express = require('express');
const path = require('path');
const { isAuthenticated, hasRole } = require('../middlewares/auth'); // Ensure correct import path

const router = express.Router();

// Serving static pages
router.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'auth.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'registration.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/gpscenter_dr', isAuthenticated, hasRole('Doctor'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'gpscenter_dr.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/gpscenter_cg', isAuthenticated, hasRole('CareGiver'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'gpscenter_cg.html'));
});

// Patient page - Only accessible if the user is authenticated and has the 'Patient' role
router.get('/gpscenter', isAuthenticated, hasRole('Patient'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'gpscenter.html'));
});

router.get('/reports_dr', isAuthenticated, hasRole('Doctor'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'reports_dr.html'));
});

router.get('/reports_cg', isAuthenticated, hasRole('CareGiver'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'reports_cg.html'));
});



// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/reports', isAuthenticated, hasRole('Patient') || hasRole('CareGiver'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'reports.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/notifications', isAuthenticated, hasRole('Patient'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'notifications.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/notifications_dr', isAuthenticated, hasRole('Doctor'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'notifications_dr.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/notifications_cg', isAuthenticated, hasRole('CareGiver'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'notifications_cg.html'));
});
// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/appointments', isAuthenticated, hasRole('Patient'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'appointments.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/appointments_cg', isAuthenticated, hasRole('CareGiver'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'appointments_cg.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/appointments_dr', isAuthenticated, hasRole('Doctor'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'appointments_dr.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/emergencies_dr', isAuthenticated, hasRole('Doctor'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'emergencies_dr.html'));
});

// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/emergencies_cg', isAuthenticated, hasRole('CareGiver'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'emergencies_cg.html'));
});



// Doctor page - Only accessible if the user is authenticated and has the 'Doctor' role
router.get('/emergencies', isAuthenticated, hasRole('Patient'), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'emergencies.html'));
});




module.exports = router;




