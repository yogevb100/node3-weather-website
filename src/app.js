const path = require("path");
const express = require("express"); //server
const hbs = require("hbs"); //dynamic templates
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast"); //weather forecast

const app = express();
const port = process.env.PORT || 3000; //heroku port or local port
//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup  handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));//

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "YB",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "What about?",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Help is here!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//app.com
//app.com/help
//app.com/about
// app.get("/about", (req, res) => {
//   console.log(publicDirectoryPath);
//   res.sendFile("./about.html");
// });

app.get("*", (req, res) => {
  res.send("My 404 page");
});

//port 3000 local
//port 80 heroku
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
