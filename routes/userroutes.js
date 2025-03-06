const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');
const router = express.Router();


  //user demantia_users handling route
  router.post('/registration', async (req, res) => {
    const { fullname, email, contact, password, role } = req.body;
  const user_id = email + role;
    try {
      // Check if the email already exists
      const validateEmail = `SELECT * FROM demantia_users WHERE email = ? AND role =?`;
      const [emailResults] = await pool.promise().execute(validateEmail, [email, role]);
  
      if (emailResults.length > 0) {
        return res.status(400).json({ error: `A ${role} with the same email already registered.` });
      }
  
      // Validate contact
      const validateContact = `SELECT * FROM demantia_users WHERE contact = ? AND role =?`;
      const [contactResults] = await pool.promise().execute(validateContact, [contact, role]);
  
      if (contactResults.length > 0) {
        return res.status(400).json({ error: `A ${role} with the same phone number already registered.` });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
  
      // Insert the user into the database only if email sending succeeds
      const insertQuery = `INSERT INTO demantia_users (user_id, username, email, contact, password, role) VALUES (?, ?, ?, ?, ?, ?)`;
      await pool.promise().execute(insertQuery, [user_id, fullname, email, contact, hashedPassword, role]);
  
  
      res.status(200).json({ message: `You have successfully registered as a ${role}. Redirecting...` });
    } catch (error) {
      console.error('Detailed error during demantia_users:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
      });
      res.status(500).json({ error: 'Could not complete demantia_users due to a technical issue. Please try again later.' });
    }
  });
  
  

  router.post('/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      
  
      // Validate input fields
      if (!email || !password || !role) {
        return res.status(400).json({ error: 'Please fill all the fields and select who you are.' });
      }
  
      // Get a database connection
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Connection error:', err);
          return res.status(500).json({ error: 'Database connection error.' });
        }
  
        // Query the database
        const sql = `SELECT * FROM demantia_users WHERE email = ? AND role = ?`;
        connection.query(sql, [email, role], async (err, results) => {
          connection.release(); // Ensure connection is released
  
          if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query error.' });
          }
  
          if (results.length === 0) {
            return res.status(400).json({ error: `No ${role} found with those credentials.` });
          }
  
          const user = results[0];
  
          // Validate password
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return res.status(400).json({ error: 'Invalid credentials.' });
          }
  
          // Store email and role in session
          req.session.email = email;
          req.session.role = role; // Store the role from the request body or database
  
          // Send success response with a message
          return res.status(200).json({ message: 'Login successful! Redirecting...' });
        });
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  });
  
  


  // Fetch User Data route
router.get('/get-user', (req, res) => {
  const email = req.session.email;
  const role = req.session.role;
  const query = 'SELECT username, email, role FROM demantia_users WHERE email = ? AND role = ?';

  pool.promise().execute(query, [email, role])
    .then(([results]) => {
      if (results.length > 0) {
        return res.json(results[0]);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.redirect('/auth');
  });
});

module.exports = router;