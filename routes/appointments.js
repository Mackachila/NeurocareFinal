const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { pool } = require('../config/db');


// Create appointment
router.post("/create-appointment", async (req, res) => {
    if (!req.session.email) return res.status(401).json({ message: "Unauthorized" });

    const { withWhom, date, location, contact, address, about } = req.body;
    const appointmentId = uuidv4();
    const email = req.session.email;
    const role = req.session.role;

    try {
        // Check if 'withWhom' exists in the database
        const [userResult] = await pool.promise().query(
            "SELECT email FROM demantia_users WHERE email = ?",
            [withWhom]
        );

        if (userResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is trying to book an appointment with themselves
        const [wrongAppointment] = await pool.promise().query(
            "SELECT email FROM demantia_users WHERE email = ? AND role = ?",
            [email, role]
        );

        if (wrongAppointment.length > 0 && wrongAppointment[0].email === withWhom) {
            return res.status(400).json({ message: "You cannot book an appointment with yourself" });
        }

        // Proceed with inserting the appointment if user exists and is not the same user
        await pool.promise().query(
            "INSERT INTO appointments (appointment_id, email, role, withWhom, date, location, contact, address, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [appointmentId, email, role, withWhom, date, location, contact, address, about]
        );

        res.json({ message: "Appointment scheduled successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});


// // Fetch appointments
// router.get("/appointments", async (req, res) => {
//     if (!req.session.email || !req.session.role) return res.status(401).json({ message: "Unauthorized" });
//     const role = req.session.role;
//     const email = req.session.email;
//     try {
//         const [appointments] = await pool.promise().query(
//             "SELECT * FROM appointments WHERE email = ? AND role = ? ORDER BY date ASC",
//             [email, role]
//         );
//         res.json(appointments);
//         console.log(appointments);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Database error" });
//     }
// });


// Fetch appointments
router.get("/appointments4", async (req, res) => {
    if (!req.session.email || !req.session.role) return res.status(401).json({ message: "Unauthorized" });
    const role = req.session.role;
    const email = req.session.email;
   
    try {
        const [appointments] = await pool.promise().query(
            "SELECT * FROM appointments WHERE email = ? AND role = ? ORDER BY date ASC",
            [email, role]
        );
        res.json(appointments);
        console.log(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

// // Fetch reports sent by the logged-in user (as sender)
// router.get("/appointments", async (req, res) => {
//     if (!req.session.email) return res.status(401).json({ message: "Unauthorized" });

//     const role = req.session.role;
//     const email = req.session.email;

//     try {
//         const [reports] = await pool.promise().query(
//             "SELECT * FROM reports WHERE email = ? and role = ? ORDER BY date DESC",
//             [email, role]
//         );

//         res.json(reports);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Database error" });
//     }
// });

// Fetch appointments
router.get("/appointments2", async (req, res) => {
    if (!req.session.email || !req.session.role) return res.status(401).json({ message: "Unauthorized" });
    // const role = req.session.role;
    // const email = req.session.email;
    
    try {
        const [appointments2] = await pool.promise().query(
            "SELECT * FROM appointments WHERE withWhom = ? ORDER BY date ASC",
            [req.session.email]
        );
        res.json(appointments2);
        // console.log(appointments2);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

// Edit appointment
router.put("/edit-appointment/:id", async (req, res) => {
    const { date, about, location, address} = req.body;
    const { id } = req.params;
    

    try {
        await pool.promise().query(
            "UPDATE appointments SET date = ?, location = ?, address = ?, about = ? WHERE appointment_id = ?",
            [date,location, address, about, id]
        );
        res.json({ message: "Appointment updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

// // Backend route for updating appointment date
// router.post("/edit-appointment", async (req, res) => {
//     const { id, newDate } = req.body;
//     if (!id || !newDate) {
//         return res.status(400).json({ message: "ID and new date are required." });
//     }

//     try {
//         const [result] = await pool.promise().query(
//             "UPDATE appointments SET date = ? WHERE id = ?",
//             [new Date(newDate), id]
//         );

//         if (result.affectedRows > 0) {
//             res.json({ message: "Appointment updated successfully!" });
//         } else {
//             res.status(404).json({ message: "Appointment not found." });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Database error during update." });
//     }
// });

// Cancel appointment
router.delete("/cancel-appointment/:id", async (req, res) => {
    const { id } = req.params;

    try {
         // Check if the user is trying to book an appointment with themselves
         const [lateDeletion] = await pool.promise().query(
            "SELECT * FROM appointments WHERE appointment_id = ?",
            [id]
        );

        if (lateDeletion.length > 0 && lateDeletion[0].status === "Checked-in" || lateDeletion[0].status === "Missed") {
            return res.status(400).json({ message: "This appointment can nolonger be canceled" });
        }

        await pool.promise().query(
            "DELETE FROM appointments WHERE appointment_id = ?",
            [id]
        );
        res.json({ message: "Appointment canceled successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

// Check-in for appointment
router.post("/check-in/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [checkin] = await pool.promise().query(
            "UPDATE appointments SET status = 'Checked-in', last_visit = NOW() WHERE appointment_id = ? AND status = 'Pending'",
            [id]
        );
        if(checkin.affectedRows === 0){
            return res.status(400).json({ message: "This appointment can nolonger be Checked-in" });
     
             }
        res.json({ message: "Checked in successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

// Mark appointment as missed
router.post("/mark-missed/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [markasmissed] = await pool.promise().query(
            "UPDATE appointments SET status = 'Missed' WHERE appointment_id = ? AND status = 'Pending'",
            [id]
        );
        if(markasmissed.affectedRows === 0){
       return res.status(400).json({ message: "This appointment can nolonger be marked as missed" });

        }
        res.json({ message: "Marked as missed." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});


// decline appointment

// Mark appointment as missed
router.post("/decline-appointment/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [decline] =  await pool.promise().query(
            "UPDATE appointments SET status = 'Declined' WHERE appointment_id = ? AND status = 'Pending'",
            [id]
        );
        if(decline.affectedRows === 0){
            return res.status(400).json({ message: "This appointment can nolonger be declined" });
     
             }
        res.json({ message: "Appointment Declined." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

module.exports = router;
