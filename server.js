import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;
const API_key = "6d0b4b84652d2aa76cf16f31a8e8b8fb";

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { WeatherData: null });
});

app.post("/weather", async (req, res) => {
    const { lat, lon } = req.body;
    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and Longitude are required." });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data." });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
