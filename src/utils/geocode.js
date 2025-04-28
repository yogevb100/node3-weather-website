const request = require("request");

const geocode = (address, callback) => {
  const accessKey = "58c2e4331a7542a1832814b0f5767ce2"; // Replace with your OpenCage API key
  const url =
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    encodeURIComponent(address) +
    "&key=" +
    accessKey +
    "&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.results.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const data = response.body.results[0];
      const latitude = data.geometry.lat;
      const longitude = data.geometry.lng;
      const location = data.formatted;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
