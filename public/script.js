const searchForm = document.getElementById("searchForm");
const searchLocation = document.getElementById("searchLocation");
const mapDiv = document.getElementById("map");
const weatherInfo = document.getElementById("weather-info");

// Initialize Leaflet Map with Restricted Zoom
const map = L.map(mapDiv, {
    center: [20.5937, 78.9629], // Default: India
    zoom: 5,
    minZoom: 3,  // Minimum zoom level
    maxZoom: 18, // Maximum zoom level
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker;

// Function to Fetch Weather and Location Name
async function fetchWeather(lat, lon) {
    try {
        // Fetch Reverse Geocoding for Exact Location Name
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const geoData = await geoResponse.json();
        const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.display_name;

        // Fetch Weather Data
        const response = await fetch("/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ lat, lon })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const weatherData = await response.json();
        weatherData.city = city; // Add city name to data

        updateWeatherUI(weatherData);
    } catch (error) {
        console.error("Error:", error);
        weatherInfo.innerHTML = `<p>Could not fetch weather data. Try again.</p>`;
    }
}

// Function to Update UI with Weather and City
function updateWeatherUI(data) {
    weatherInfo.innerHTML = `
        <div class="responsecards">
            <div class="res-card city"><h3>City</h3><p>${data.city || data.name}</p></div>
            <div class="res-card temperature-card"><h3>Temperature</h3><p>${data.main.temp}°C</p></div>
            <div class="res-card feels-like-card"><h3>Feels Like</h3><p>${data.main.feels_like}°C</p></div>
            <div class="res-card cloud-card"><h3>Cloud Cover</h3><p>${data.weather[0].description}</p></div>
            <div class="res-card wind-card"><h3>Wind Speed</h3><p>${data.wind.speed} m/s</p></div>
            <div class="res-card humidity-card"><h3>Humidity</h3><p>${data.main.humidity} %</p></div>
            <div class="res-card pressure-card"><h3>Pressure</h3><p>${data.main.pressure} hPa</p></div>
        </div>
    `;
}

// Click Event to Fetch Weather and City
map.on("click", async function (e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    if (marker) {
        marker.remove();
    }
    marker = L.marker([lat, lon]).addTo(map);

    fetchWeather(lat, lon);
});

// Search Form Event Listener
searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const location = searchLocation.value.trim();

    if (!location) return;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        const data = await response.json();

        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            map.setView([lat, lon], 13);
            if (marker) {
                marker.remove();
            }
            marker = L.marker([lat, lon]).addTo(map);

            fetchWeather(lat, lon);
        } else {
            alert("Location not found!");
        }
    } catch (error) {
        console.error("Error fetching location:", error);
    }
});

// Update Date and Time Without Seconds
document.querySelector(".datetime").innerHTML = new Date().toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
});

document.querySelector(".year").innerHTML = new Date().getFullYear();