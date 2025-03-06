const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const router = express();

router.use(cors());
router.use(express.json());

router.get("/reverse-geocode", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching location data" });
    }
});

router.listen(3001, () => console.log("CORS Proxy running on port 3001"));
module.exports = router;