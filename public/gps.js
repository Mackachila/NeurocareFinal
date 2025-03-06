// history-list
// generalMessageInput-container-body-form
document.addEventListener('DOMContentLoaded', function () {
 
    fetch('/get-user')
      .then(response => response.json())
      .then(data => {
   //     console.log('Fetched username from server:', data.username, data.currentAccount, data.accountBallance, data.accountPhonenumber, data.accountEmail, data.invitationLink );
  
  //  const username = data.username.split(" ")[0];
  const email = data.email;
  // const role = data.role;
  
  
  // document.getElementById('user_name').textContent = ` ${role}`;
  document.getElementById('emailContent').textContent = ` ${email}`;
        
      })
      .catch(error => {
        console.error('Error fetching username:', error);
        // Handle the error and maybe redirect to the login page showLoadingSpinner()
       });
   });
  
   

let apiKey;
let trackingEnabled = false;
let trackingInterval;
let map, userMarkers = {};

// 🌐 Fetch Google Maps API key and load the script
async function loadGoogleMapsScript() {
    try {
        const response = await fetch("/google-maps-api-key");
        const data = await response.json();
        apiKey = data.apiKey;

        if (!apiKey) throw new Error("API key is missing from backend response.");

        window.initMap = initMap;

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&map_ids=e7b29af32a2ebc67&callback=initMap&loading=async`;
        script.async = true;
        script.defer = true;

        script.onload = () => console.log("Google Maps script loaded successfully.");
        script.onerror = () => console.error("Failed to load Google Maps script.");

        document.head.appendChild(script);
    } catch (error) {
        console.error("Error loading Google Maps:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadGoogleMapsScript);

// 🗺️ Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 0, lng: 0 },
        mapId: "e7b29af32a2ebc67"
    });
    fetchTrackedUsers();
    fetchHistoricalMovements();
}

// 🎡 Show/Hide Spinner dynamically
function toggleSpinner(show) {
    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = show ? "flex" : "none";
}

// 📡 Enable GPS tracking and show spinner while fetching
async function enableGPSTracking() {
    if (navigator.geolocation) {
        trackingEnabled = true;
        toggleSpinner(true);
        trackingInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        await fetch("/update-location", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ latitude, longitude })
                        });
                        updateUserLocationOnMap("Live Location", latitude, longitude);
                        toggleSpinner(false);
                    } catch (error) {
                        console.error("Error updating location:", error);
                        toggleSpinner(true);
                    }
                },
                (error) => {
                    console.error("GPS error:", error);
                    toggleSpinner(true);
                }
            );
        }, 10000);
        
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// 🚫 Disable GPS tracking
function disableGPSTracking() {
    trackingEnabled = false;
    clearInterval(trackingInterval);
    toggleSpinner(false);
}

// 📍 Update user marker on the map
function updateUserLocationOnMap(username, latitude, longitude) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
        console.warn(`Invalid coordinates for ${username}:`, latitude, longitude);
        toggleSpinner(true);
        return;
    }

    const position = { lat, lng };

    if (userMarkers[username]) {
        userMarkers[username].setPosition(position);
    } else {
        userMarkers[username] = new google.maps.Marker({
            map: map,
            position: position,
            title: username
        });
    }
    map.setCenter(position);
    fetchPlaceName(lat, lng, username);
}

// 🌍 Fetch place name from backend proxy
async function fetchPlaceName(lat, lng, username) {
    try {
        const response = await fetch(`/reverse-geocode?lat=${lat}&lon=${lng}`);
        const data = await response.json();
        const place = data.display_name || "Unknown Location";
        document.getElementById("tracking-info").innerHTML = `<strong>${username}:</strong> ${place}`;
        fetchHistoricalMovements();
    } catch (error) {
        console.error("Error fetching place name:", error);
        document.getElementById("tracking-info").innerHTML = `${username}: Unable to fetch location.`;
    }
}

// ⏳ Fetch and display historical movements with place names
async function fetchHistoricalMovements() {
    try {
        console.log("🔄 Fetching historical movements...");
        const response = await fetch("/historical-movements");
        console.log("📡 Raw response:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Response not OK:", errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const movements = await response.json();
        console.log("✅ Parsed movements:", movements);

        const list = document.getElementById("historical-movements");
        console.log("📝 Found list element:", list);

        if (!list) {
            throw new Error("Element with ID 'historical-movements' not found.");
        }

        list.innerHTML = "";

        if (!Array.isArray(movements)) {
            console.error("❌ Movements is not an array:", movements);
            throw new Error("Invalid data format received from server.");
        }

        if (movements.length === 0) {
            console.log("ℹ️ No historical movements found.");
            const li = document.createElement("li");
            li.textContent = "No historical movements found.";
            li.classList.add("history-card");
            list.appendChild(li);
            return;
        }

        for (const move of movements) {
            console.log(`📍 Movement:`, move);
            const li = document.createElement("li");
            li.classList.add("history-card");

            // Fetch place name for the coordinates
            try {
                const placeResponse = await fetch(`/reverse-geocode?lat=${move.latitude}&lon=${move.longitude}`);
                const placeData = await placeResponse.json();
                const placeName = placeData.display_name || "Unknown Location";

                // Update the list item with the place name
                li.textContent = `${move.username} - ${placeName} (${new Date(move.updated_at).toLocaleString()})`;
            } catch (error) {
                console.error("Error fetching place name:", error);
                li.textContent = `${move.username} - (${move.latitude}, ${move.longitude}) (${new Date(move.updated_at).toLocaleString()})`;
            }

            list.appendChild(li);
        }

        console.log("✅ Movements appended successfully.");
    } catch (error) {
        console.error("❌ Failed to fetch historical movements:", error);
    }
}



// 🔍 Track other users by email with validation and spinner
async function trackOtherUser() {
    const emailInputField = document.getElementById("track-email");
    if (!emailInputField) {
        console.error("Email input field not found.");
        return;
    }
    const emailInput = emailInputField.value.trim();
    if (!emailInput) return alert("Please enter a valid email.");

    toggleSpinner(true);
    try {
        const response = await fetch("/track-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailInput })
        });

        if (response.status === 404) {
            toggleSpinner(false);
            return alert("User not found or GPS tracking is disabled.");
        }

        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

        const { latitude, longitude, updated_at } = await response.json();
        if (latitude && longitude) {
            updateUserLocationOnMap(emailInput, latitude, longitude);
            document.getElementById("tracking-info").innerHTML = `<strong>${emailInput}</strong> - Last seen at ${new Date(updated_at).toLocaleString()}`;
        } else {
            alert("User exists but no recent location data available.");
        }
    } catch (error) {
        console.error("Error tracking user:", error);
        alert("Unable to track user. They may have disabled GPS tracking or not exist.");
    } finally {
        toggleSpinner(false);
    }
}

// 🔄 Toggle GPS tracking

document.getElementById("toggle-tracking").addEventListener("click", function () {
    if (trackingEnabled) {
        disableGPSTracking();
        this.textContent = "Enable GPS Tracking";
    } else {
        enableGPSTracking();
        this.textContent = "Disable GPS Tracking";
    }
});

document.getElementById("track-user-btn").addEventListener("click", trackOtherUser);

// 🔃 Periodic refresh for tracked users
setInterval(fetchTrackedUsers, 300000);
