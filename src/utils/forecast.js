const request = require("request");

const forecast = (latitude = "42.3555", longitude = "71.0565", callback) => {
  try {
    const accessKey = "5939e99065e1f8be7f00f538f97c2cc1";
    const url =
      "http://api.weatherstack.com/current?access_key=" +
      accessKey +
      "&query=" +
      latitude +
      "," +
      longitude;
    console.log(url);
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Connection error", undefined);
      } else if (response.body.error) {
        callback("Location error", undefined);
      } else {
        callback(undefined, response.body);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = forecast;
