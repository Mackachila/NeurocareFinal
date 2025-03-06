// validateUsername
const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');
const router = express.Router();

// router.get('/unreadNotificationsCount', (req, res) => {
//     const { username } = req.query;
//     req.session.email = email;
//   if(req.session.email == username){
//     return res.status(500).json({ success: false, message: 'You cannot send notification to yourself' });
//     }
//     else{   
//         pool.query(
//             'SELECT COUNT(*) AS unreadCount FROM notifications WHERE recipient_username = ? AND is_read = 0',
//             [username],
//             (error, results) => {
//                 if (error) {
//                     console.error('Error fetching unread notifications count:', error);
//                     return res.status(500).json({ success: false, message: 'Error fetching unread notifications count' });
//                 }
//                 res.json({ success: true, unreadCount: results[0].unreadCount });
//             }
//         );
//     }
    
//   });


// Validate Username
router.get('/validateUsername', (req, res) => {
    const { username } = req.query;
  
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required.' });
    }
  
    const query = 'SELECT COUNT(*) AS count FROM demantia_users WHERE email = ?';
    pool.query(query, [username], (err, results) => {
      if (err) {
        console.error('Error validating username:', err);
        return res.status(500).json({ success: false, message: 'Database error.' });
      }
  
      const exists = results[0].count > 0;
      res.json({ success: true, exists });
    });
  });

// Send Specific Notification
router.post('/sendSpecificNotification', async (req, res) => {
    const { username, message } = req.body;
    const email = req.session.email;
    const role = req.session.role;
    if (!email || !role) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Check if username is same as session email
    if (email === username) {
        return res.status(400).json({ success: false, message: 'You cannot send notification to yourself' });
    }

    if (!username || !message) {
      return res.status(400).json({ success: false, message: 'Username and message are required.' });
    }
  
    const selectquery = 'SELECT contact FROM demantia_users WHERE email = ? AND role = ?';
  const [contactResults] = await pool.promise().execute(selectquery, [email, role]);
  const contactfound = contactResults[0].contact;

    const query = 'INSERT INTO notifications (recipient_username, message, contact) VALUES (?, ?, ?)';
    pool.query(query, [username, message, contactfound], (err, results) => {
      if (err) {
        console.error('Error sending notification:', err);
        return res.status(500).json({ success: false, message: 'Database error.' });
      }
  
      res.json({ success: true, message: 'Notification sent successfully.' });
    });
  });


  // Send Specific Notification
router.post('/emergencyNotification', async (req, res) => {
  const { emergencymessage } = req.body;
  const email = req.session.email;
  const role = req.session.role;
  if (!email || !role) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
  }


  if (!emergencymessage) {
    return res.status(400).json({ success: false, message: 'Emergency message are required.' });
  }

  const selectquery = 'SELECT contact FROM demantia_users WHERE email = ? AND role = ?';
const [contactResults] = await pool.promise().execute(selectquery, [email, role]);
const contactfound = contactResults[0].contact;

  const query = 'INSERT INTO emergencies (username, emergency, contact) VALUES (?, ?, ?)';
  pool.query(query, [email, emergencymessage, contactfound, role], (err, results) => {
    if (err) {
      console.error('Error sending notification:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    res.json({ success: true, message: 'Emergency notification sent successfully.' });
  });
});



//geting the scheduled meals route
router.get("/emergencys", async (req, res) => {
  if (!req.session.email) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const email = req.session.email;
  // return res.status(401).json({ message: "Communication with the server created." });

  try {
      const [emergency] = await pool.promise().query(
          "SELECT id, emergency, timestamp FROM emergencies WHERE username = ? ORDER BY timestamp ASC",
          [email]
      );

      res.json(emergency);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Database error" });
  }
});


// Route to handle deleting scheduled emergencies
router.post("/delete-emergency", async (req, res) => {
  if (!req.session.email) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const { emergency_id } = req.body;
  const email = req.session.email;

  if (!emergency_id) {
      return res.status(400).json({ message: "Emergency ID is required" });
  }

  try {
      const [result] = await pool.promise().query(
          "DELETE FROM emergencies WHERE id = ? AND username = ?", //
          [emergency_id, email]
      );

      if (result.affectedRows > 0) {
          res.json({ message: "Emergency deleted successfully!" });
      } else {
          res.status(404).json({ message: "Emergency not found or you do not have permission to delete it." });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Database error. Please try again later." });
  }
});


//geting the scheduled meals route
router.get("/emergencys2", async (req, res) => {
  if (!req.session.email) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const email = req.session.email;
  const role = req.session.role;
  // return res.status(401).json({ message: "Communication with the server created." });

  try {
      const [emergency2] = await pool.promise().query(
          "SELECT id, emergency, role, contact, timestamp FROM emergencies WHERE username != ? AND role != ? ORDER BY timestamp ASC",
          [email, role]
      );

      res.json(emergency2);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Database error" });
  }
});


// Route to handle deleting scheduled emergencies
router.post("/delete-emergency", async (req, res) => {
  if (!req.session.email) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const { emergency_id } = req.body;
  const email = req.session.email;

  if (!emergency_id) {
      return res.status(400).json({ message: "Emergency ID is required" });
  }

  try {
      const [result] = await pool.promise().query(
          "DELETE FROM emergencies WHERE id = ? AND username = ?", //
          [emergency_id, email]
      );

      if (result.affectedRows > 0) {
          res.json({ message: "Emergency deleted successfully!" });
      } else {
          res.status(404).json({ message: "Emergency not found or you do not have permission to delete it." });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Database error. Please try again later." });
  }
});

  
  
  // Send General Notification
  router.post('/sendGeneralNotification', (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ success: false, message: 'Notification is required.' });
    }
  
    const query = 'INSERT INTO general_notifications (message) VALUES (?)';
    pool.query(query, [message], (err, results) => {
      if (err) {
        console.error('Error sending notification:', err);
        return res.status(500).json({ success: false, message: 'Database error.' });
      }
  
      res.json({ success: true, message: 'Notification sent successfully.' });
    });
  });

  router.get('/unreadNotificationsCount', (req, res) => {
    const { username } = req.query;
  
    pool.query(
        'SELECT COUNT(*) AS unreadCount FROM notifications WHERE recipient_username = ? AND is_read = 0',
        [username],
        (error, results) => {
            if (error) {
                console.error('Error fetching unread notifications count:', error);
                return res.status(500).json({ success: false, message: 'Error fetching unread notifications count' });
            }
            res.json({ success: true, unreadCount: results[0].unreadCount });
        }
    );
  });
  
  
  router.get('/getNotifications', (req, res) => {
    const { username } = req.query;
  
    pool.query(
        'SELECT id, message, is_read, contact, timestamp FROM notifications WHERE recipient_username = ? ORDER BY timestamp DESC',
        [username],
        (error, results) => {
            if (error) {
                console.error('Error fetching notifications:', error);
                return res.status(500).json({ success: false, message: 'Error fetching notifications' });
            }
            res.json({ success: true, notifications: results });
        }
    );
  });
  
  router.get('/getGeneralNotifications', (req, res) => {
    pool.query(
        'SELECT id, message, is_read, timestamp FROM general_notifications ORDER BY timestamp DESC',
        (error, results) => {
            if (error) {
                console.error('Error fetching general notifications:', error);
                return res.status(500).json({ success: false, message: 'Error fetching general notifications' });
            }
            res.json({ success: true, notifications: results });
        }
    );
  });
  
  router.post('/markAsRead', (req, res) => {
    const { notificationId, isGeneral } = req.body;
    const table = isGeneral ? 'general_notifications' : 'notifications';
    
    pool.query(
        `UPDATE ${table} SET is_read = 1 WHERE id = ?`,
        [notificationId],
        (error, results) => {
            if (error) {
                console.error('Error marking notification as read:', error);
                return res.status(500).json({ success: false, message: 'Error marking notification as read' });
            }
            res.json({ success: true, message: 'Notification marked as read' });
        }
    );
  });

  module.exports = router;