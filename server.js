const express = require('express');
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
app.set('view engine', "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, resp) => {
    const sendData = { location: "Location", temp: "Temp", disc: "Description", feel: "Feel-like" }
    resp.render("index", { sendData: sendData });
});

app.post("/", async (req, resp) => {
    let location = await req.body.city;
    console.log(location);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${process.env.APIKEY}&units=metric`
    const response = await fetch(url);
    const weatherData = await response.json();
    const temp = weatherData.main.temp;
    const disc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const sendData = {};
    sendData.temp = temp;
    sendData.disc = disc;
    sendData.location = location;
    sendData.feel = weatherData.main.feels_like;
    sendData.humidity = weatherData.main.humidity;
    sendData.speed = weatherData.wind.speed;
    resp.render('index', { sendData });

    console.log(weatherData);

});



app.listen(3000, () => {
    console.log("server is running");
})