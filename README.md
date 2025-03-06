# 🌤 Weather App

## 📌 Introduction
This Weather App provides real-time weather information for any location. Users can search for a city by name or select a location directly on an interactive map to fetch weather details. The app integrates **OpenWeatherMap API** to retrieve accurate weather data and presents it in an intuitive UI.

## 🚀 Features
- **Search & Map Selection**: Enter a city name or click on the map to get weather updates.
- **Real-Time Weather Data**: Fetches live weather details including:
  - 🌍 City Name
  - 🌡 Temperature
  - 🔥 Feels Like Temperature
  - ☁ Cloud Cover Description
  - 💨 Wind Speed
  - 💦 Humidity Percentage
  - 📏 Pressure (hPa)
- **Live Timestamp**: Displays the exact time of the last fetched weather data.
- **User-Friendly UI**: Designed with a modern gradient theme for a clean and engaging experience.

## 🛠 Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **APIs**: OpenWeatherMap API
- **Mapping**: Leaflet.js with OpenStreetMap

## 📂 Project Structure
```
/weather-app
│-- public/
│   ├── css/ (Stylesheets)
│   ├── js/ (Frontend scripts)
│   ├── images/ (Assets)
│-- views/
│   ├── index.ejs (Main UI)
│-- server.js (Backend logic with Express)
│-- package.json (Dependencies & scripts)
```

## 📌 Usage
1. **Clone the Repository**
   ```bash
   git clone https://github.com/MALLIKHARJUNCHILUKURI-02/Weather-App-Unified-Mentor-Project.git
   cd weather-app
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run the App**
   ```bash
   node server.js
   ```
4. **Open in Browser**
   ```
   http://localhost:3000
   ```
5. **Search for a city** or **Click on the map** to view live weather details.

## ⚡ Future Enhancements
- Add **7-day forecast** with graphical charts.
- Implement **user location detection** for instant weather updates.
- Introduce **multiple language support**.
- Improve UI with **dark mode toggle**.

---
