
const express = require('express');
const { pool } = require('../config/db');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();



// // router.get("/google-maps-api-key", (req, res) => {
// //     const apiKey = process.env.GOOGLE_MAPS_API_KEY;
// //     if (!apiKey) {
// //         return res.status(500).json({ message: "Google Maps API key not configured." });
// //     }
// //     res.json({ apiKey });
// // });



// // router.post("/update-location", async (req, res) => {
// //     if (!req.session.email) return res.status(401).json({ message: "Unauthorized." });
// //     const { latitude, longitude } = req.body;
// //     try {
// //         await pool.promise().query(
// //             "INSERT INTO user_locations (id, email, latitude, longitude, updated_at) VALUES (?, ?, ?, ?, NOW())",
// //             [uuidv4(), req.session.email, latitude, longitude]
// //         );
// //         res.json({ message: "Location updated successfully." });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Failed to update location." });
// //     }
// // });

// // router.get("/tracked-users", async (req, res) => {
// //     const email = req.session.email;
// //     try {
        
// //         const [users] = await pool.promise().query(
// //             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email =? AND updated_at >= NOW() - INTERVAL 5 MINUTE",
// //             [email]
// //         );
// //         // console.log("Fetched tracked users:", users); // 🔍 Check what is returned here
// //         res.json(users);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Failed to fetch tracked users." });
// //     }
// // });

// // router.get("/historical-movements", async (req, res) => {
// //     const email = req.session.email;
// //     if (!email) return res.status(401).json({ message: "Unauthorized." });

// //     try {
// //         const [movements] = await pool.promise().query(
// //             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
// //             [email] // ✅ Corrected comma placement
// //         );

// //         if (movements.length === 0) {
// //             return res.status(404).json({ message: "No historical movements found" });
// //         }

// //         res.json(movements);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Failed to fetch historical movements." });
// //     }
// // });


// // ✅ Fetch Google Maps API key
// router.get("/google-maps-api-key", (req, res) => {
//     const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//     if (!apiKey) return res.status(500).json({ message: "Google Maps API key not configured." });
//     res.json({ apiKey });
// });


// // // ✅ Track a specific user by email
// // router.post("/track-user", async (req, res) => {
// //     const { email } = req.body;
// //     if (!email) return res.status(400).json({ message: "Email is required." });

// //     try {
// //         const [location] = await pool.promise().query(
// //             "SELECT latitude, longitude, updated_at FROM user_locations WHERE email = ? AND updated_at >= NOW() - INTERVAL 5 MINUTE ORDER BY updated_at DESC LIMIT 1",
// //             [email]
// //         );
// //         if (location.length === 0) return res.status(404).json({ message: "User not found or tracking not enabled." });

// //         const [movements] = await pool.promise().query(
// //             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
// //             [email]
// //         );
// //         res.json({ latitude: location[0].latitude, longitude: location[0].longitude, updated_at: location[0].updated_at, movements });
// //     } catch (error) {
// //         console.error("Server error:", error);
// //         res.status(500).json({ message: "Failed to retrieve user location." });
// //     }
// // });


// // // ✅ Fetch historical movements for logged-in user
// // router.get("/historical-movements", async (req, res) => {
// //     const email = req.session.email;
// //     if (!email) return res.status(401).json({ message: "Unauthorized." });

// //     try {
// //         const [movements] = await pool.promise().query(
// //             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
// //             [email]
// //         );
// //         if (movements.length === 0) return res.status(404).json({ message: "No historical movements found" });
// //         res.json(movements);
// //     } catch (error) {
// //         res.status(500).json({ message: "Failed to fetch historical movements." });
// //     }
// // });

// // From here down


// // ✅ Update user location
// router.post("/update-location", async (req, res) => {
//     if (!req.session.email) return res.status(401).json({ message: "Unauthorized." });
//     const { latitude, longitude } = req.body;
//     try {
//         await pool.promise().query(
//             "INSERT INTO user_locations (id, email, latitude, longitude, updated_at) VALUES (?, ?, ?, ?, NOW())",
//             [uuidv4(), req.session.email, latitude, longitude]
//         );
//         res.json({ message: "Location updated successfully." });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update location." });
//     }
// });


// // ✅ Backend endpoint for tracking user with GPS disabled check
// router.post("/track-user", async (req, res) => {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required." });

//     try {
//         const [rows] = await pool.promise().query(
//             "SELECT latitude, longitude, updated_at, gps_enabled FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 1",
//             [email]
//         );

//         if (rows.length === 0) return res.status(404).json({ message: "User not found." });

//         const { latitude, longitude, updated_at, gps_enabled } = rows[0];

//         if (!gps_enabled) return res.status(404).json({ message: "GPS tracking disabled." });

//         res.json({ latitude, longitude, updated_at, gps_enabled });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to track user." });
//     }
// });

// // ✅ Backend endpoint for historical movements
// router.get("/historical-movements", async (req, res) => {
//     const email = req.query.email || req.session.email;
//     if (!email) return res.status(401).json({ message: "Unauthorized." });

//     try {
//         const [movements] = await pool.promise().query(
//             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
//             [email]
//         );
//         if (movements.length === 0) return res.status(404).json({ message: "No historical movements found" });
//         res.json(movements);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch historical movements." });
//     }
// });


// // ✅ Backend endpoint for tracked users
// router.get("/tracked-users", async (req, res) => {
//     const email = req.session.email;
//     if (!email) return res.status(401).json({ message: "Unauthorized." });

//     try {
//         const [trackedUsers] = await pool.promise().query(
//             "SELECT email, latitude, longitude FROM user_locations WHERE gps_enabled = 1 AND email != ?",
//             [email]
//         );
//         res.json(trackedUsers);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch tracked users." });
//     }
// });


// // // ✅ Fetch own locationreverse-geocode
// router.get("/own-location", async (req, res) => {
//     if (!req.session.email) return res.status(401).json({ message: "Unauthorized." 

//     });
//     try {
//         const [rows] = await pool.promise().query(
//             "SELECT latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 1",
//             [req.session.email]
//         );
//         if (rows.length === 0) return res.status(404).json({ message: "Location not found." });
//         res.json(rows[0]);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch own location." });
//     }
// });

// // // ✅ Update user location
// // router.post("/update-location", async (req, res) => {
// //     if (!req.session.email) return res.status(401).json({ message: "Unauthorized." });
// //     const { latitude, longitude } = req.body;
// //     try {
// //         await pool.promise().query(
// //             "INSERT INTO user_locations (id, email, latitude, longitude, updated_at) VALUES (?, ?, ?, ?, NOW())",
// //             [uuidv4(), req.session.email, latitude, longitude]
// //         );
// //         res.json({ message: "Location updated successfully." });
// //     } catch (error) {
// //         res.status(500).json({ message: "Failed to update location." });
// //     }
// // });

// // // ✅ Track another user (with GPS check)
// // router.post("/track-user", async (req, res) => {
// //     const { email } = req.body;
// //     if (!req.session.email || !email) return res.status(400).json({ message: "Unauthorized or missing email." });
// //     if (email === req.session.email) return res.status(403).json({ message: "Cannot track yourself." });

// //     try {
// //         const [rows] = await pool.promise().query(
// //             "SELECT latitude, longitude, updated_at, gps_enabled FROM user_locations WHERE email = ? AND gps_enabled = 1 ORDER BY updated_at DESC LIMIT 1",
// //             [email]
// //         );
// //         if (rows.length === 0) return res.status(404).json({ message: "User not found or GPS disabled." });
// //         const { latitude, longitude, updated_at } = rows[0];
// //         res.json({ latitude, longitude, updated_at });
// //     } catch (error) {
// //         res.status(500).json({ message: "Failed to track user." });
// //     }
// // });

// // // ✅ User's own historical movements
// // router.get("/own-historical-movements", async (req, res) => {
// //     if (!req.session.email) return res.status(401).json({ message: "Unauthorized." });
// //     try {
// //         const [movements] = await pool.promise().query(
// //             "SELECT latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
// //             [req.session.email]
// //         );
// //         res.json(movements);
// //     } catch (error) {
// //         res.status(500).json({ message: "Failed to fetch own historical movements." });
// //     }
// // });

// // // ✅ Tracked user's historical movements
// // router.get("/historical-movements", async (req, res) => {
// //     const email = req.query.email;
// //     if (!req.session.email || !email) return res.status(401).json({ message: "Unauthorized or missing email." });

// //     try {
// //         const [movements] = await pool.promise().query(
// //             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
// //             [email]
// //         );
// //         res.json(movements);
// //     } catch (error) {
// //         res.status(500).json({ message: "Failed to fetch historical movements." });
// //     }
// // });



// router.get("/google-maps-api-key", (req, res) => {
//     const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//     if (!apiKey) {
//         return res.status(500).json({ message: "Google Maps API key not configured." });
//     }
//     res.json({ apiKey });
// });



// router.post("/update-location", async (req, res) => {
//     if (!req.session.email) return res.status(401).json({ message: "Unauthorized." });
//     const { latitude, longitude } = req.body;
//     try {
//         await pool.promise().query(
//             "INSERT INTO user_locations (id, email, latitude, longitude, updated_at) VALUES (?, ?, ?, ?, NOW())",
//             [uuidv4(), req.session.email, latitude, longitude]
//         );
//         res.json({ message: "Location updated successfully." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to update location." });
//     }
// });

// router.get("/tracked-users", async (req, res) => {
//     const email = req.session.email;
//     try {

//         const [users] = await pool.promise().query(
//             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email =? AND updated_at >= NOW() - INTERVAL 5 MINUTE",
//             [email]
//         );
//         // console.log("Fetched tracked users:", users); // 🔍 Check what is returned here
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to fetch tracked users." });
//     }
// });

// router.get("/historical-movements", async (req, res) => {
//     const email = req.session.email;
//     if (!email) return res.status(401).json({ message: "Unauthorized." });

//     try {
//         const [movements] = await pool.promise().query(
//             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
//             [email] // ✅ Corrected comma placement
//         );

//         if (movements.length === 0) {
//             return res.status(404).json({ message: "No historical movements found" });
//         }

//         res.json(movements);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to fetch historical movements." });
//     }
// });


// ✅ Fetch Google Maps API key
router.get("/google-maps-api-key", (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "Google Maps API key not configured." });
    res.json({ apiKey });
});

// ✅ Update user location
router.post("/update-location", async (req, res) => {
    if (!req.session.email) return res.status(401).json({ message: "Unauthorized." });
    const { latitude, longitude } = req.body;
    try {
        await pool.promise().query(
            "INSERT INTO user_locations (id, email, latitude, longitude, updated_at) VALUES (?, ?, ?, ?, NOW())",
            [uuidv4(), req.session.email, latitude, longitude]
        );
        res.json({ message: "Location updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to update location." });
    }
});

// ✅ Track a specific user by email
router.post("/track-user", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });

    try {
        const [location] = await pool.promise().query(
            "SELECT latitude, longitude, updated_at FROM user_locations WHERE email = ? AND updated_at >= NOW() - INTERVAL 5 MINUTE ORDER BY updated_at DESC LIMIT 1",
            [email]
        );
        if (location.length === 0) return res.status(404).json({ message: "User not found or tracking not enabled." });

        const [movements] = await pool.promise().query(
            "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
            [email]
        );
        res.json({ latitude: location[0].latitude, longitude: location[0].longitude, updated_at: location[0].updated_at, movements });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Failed to retrieve user location." });
    }
});


// // ✅ Fetch historical movements for logged-in user
// router.get("/historical-movements", async (req, res) => {
//     const email = req.session.email;
//     if (!email) return res.status(401).json({ message: "Unauthorized." });

//     try {
//         const [movements] = await pool.promise().query(
//             "SELECT email AS username, latitude, longitude, updated_at FROM user_locations WHERE email = ? ORDER BY updated_at DESC LIMIT 20",
//             [email]
//         );
//         if (movements.length === 0) return res.status(404).json({ message: "No historical movements found" });
//         res.json(movements);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch historical movements." });
//     }
// });

// // ✅ Fetch historical movements for logged-in user
// router.get("/historical-movements", async (req, res) => {
//     const email = req.session.email;
//     console.log(`🔐 Fetching historical movements for: ${email}`);

//     if (!email) return res.status(401).json({ message: "Unauthorized." });

//     try {
//         const [movements] = await pool.promise().query(
//             `SELECT email AS username, latitude, longitude, updated_at 
//              FROM user_locations 
//              WHERE email = ? 
//              ORDER BY updated_at DESC 
//              LIMIT 20`,
//             [email]
//         );
//         console.log("📦 Movements fetched from DB:", movements);

//         res.json(movements); // Always return an array
//     } catch (error) {
//         console.error("❌ Database error fetching historical movements:", error);
//         res.status(500).json({ message: "Failed to fetch historical movements." });
//     }
// });

// ✅ Fetch historical movements for logged-in user (last 15 movements)
router.get("/historical-movements", async (req, res) => {
    const email = req.session.email;
    console.log(`🔐 Fetching historical movements for: ${email}`);

    if (!email) return res.status(401).json({ message: "Unauthorized." });

    try {
        const [movements] = await pool.promise().query(
            `SELECT email AS username, latitude, longitude, updated_at 
             FROM user_locations 
             WHERE email = ? 
             ORDER BY updated_at DESC 
             LIMIT 15`,
            [email]
        );
        console.log("📦 Movements fetched from DB:", movements);

        res.json(movements); // Always return an array
    } catch (error) {
        console.error("❌ Database error fetching historical movements:", error);
        res.status(500).json({ message: "Failed to fetch historical movements." });
    }
});




module.exports = router;




