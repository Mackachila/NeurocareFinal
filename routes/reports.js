const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { pool } = require('../config/db');

// // Insert medical report
// router.post("/insert-report", async (req, res) => {
//     if (!req.session.email) return res.status(401).json({ message: "Unauthorized" });

//     const { email, description, status } = req.body;
//     const role = req.session.role;
//     const withWhom = req.session.email;
//     const report_id = uuidv4();

//     // Prevent users from inserting their own medical report
//     if (email === withWhom) {
//         return res.status(400).json({ message: "You cannot insert a medical report for yourself." });
//     }

//     try {
//         // Check if the provided email exists in 'demantia_users'
//         const [userResult] = await pool.promise().query(
//             "SELECT email FROM demantia_users WHERE email = ?",
//             [email]
//         );

//         if (userResult.length === 0) {
//             return res.status(404).json({ message: "No patient found with that email." });
//         }

//         // Fetch username where email = req.session.email
//         const [sessionUserResult] = await pool.promise().query(
//             "SELECT username FROM demantia_users WHERE email = ?",
//             [withWhom]
//         );

//         if (sessionUserResult.length === 0) {
//             return res.status(404).json({ message: "Your user account was not found." });
//         }

//         const username = sessionUserResult[0].username; // Extract username of the logged-in user

//         // Insert the report with the username of the logged-in user
//         await pool.promise().query(
//             "INSERT INTO reports (report_id, email, username, role, withWhom, description, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
//             [report_id, email, username, role, withWhom, description, status]
//         );

//         res.json({ message: "Medical report inserted successfully!" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Database error" });
//     }
// });

// Insert medical report
router.post("/insert-report", async (req, res) => {
    if (!req.session.email) return res.status(401).json({ message: "Unauthorized" });

    const { email, description, status } = req.body;
    const role = req.session.role;
    const withWhom = req.session.email;
    const report_id = uuidv4();

    // Prevent users from inserting their own medical report
    if (email === withWhom) {
        return res.status(400).json({ message: "You cannot insert a medical report for yourself." });
    }

    try {
        // Check if the provided email exists in 'demantia_users'
        const [userResult] = await pool.promise().query(
            "SELECT email FROM demantia_users WHERE email = ?",
            [email]
        );

        if (userResult.length === 0) {
            return res.status(404).json({ message: "No patient found with that email." });
        }

        // Fetch username where email = req.session.email
        const [sessionUserResult] = await pool.promise().query(
            "SELECT username FROM demantia_users WHERE email = ?",
            [withWhom]
        );

        if (sessionUserResult.length === 0) {
            return res.status(404).json({ message: "Seems you are not a doctor." });
        }

        const username = sessionUserResult[0].username; // Extract username of the logged-in user

        // Insert the report with the username of the logged-in user
        await pool.promise().query(
            "INSERT INTO reports (report_id, username, email, role, withWhom, description, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [report_id,  username, email, role, withWhom, description, status]
        );

        res.json({ message: "Medical report inserted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});



// Fetch reports sent by the logged-in user (as sender)
router.get("/fetch-sent-reports", async (req, res) => {
    if (!req.session.email) return res.status(401).json({ message: "Unauthorized" });

    const senderEmail = req.session.email;

    try {
        const [reports] = await pool.promise().query(
            "SELECT * FROM reports WHERE withWhom = ? ORDER BY date DESC",
            [senderEmail]
        );

        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});





// Fetch reports sent by the logged-in user (as sender)
router.get("/fetch-sent-reports2", async (req, res) => {
    if (!req.session.email) return res.status(401).json({ message: "Unauthorized" });

    const senderEmail = req.session.email;

    try {
        const [reports2] = await pool.promise().query(
            "SELECT * FROM reports WHERE email = ? ORDER BY date DESC",
            [senderEmail]
        );

        res.json(reports2);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});



// Update a report (only the sender can update)
router.post("/update-report", async (req, res) => {
    if (!req.session.email) return res.status(401).json({ message: "Unauthorized" });

    const { report_id, description, status } = req.body;
    const senderEmail = req.session.email;

    try {
        // Ensure the report exists and was sent by the logged-in user
        const [report] = await pool.promise().query(
            "SELECT * FROM reports WHERE report_id = ? AND withWhom = ?",
            [report_id, senderEmail]
        );

        if (report.length === 0) {
            return res.status(403).json({ message: "You can only edit reports you sent." });
        }

        // Update report
        await pool.promise().query(
            "UPDATE reports SET description = ?, status = ? WHERE report_id = ?",
            [description, status, report_id]
        );

        res.json({ message: "Report updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});


module.exports = router;