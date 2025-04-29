console.log("client side js file loaded.");

const weatherForm = document.querySelector("#weather-form");
const search = document.querySelector("#search-box");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent =
          data.forecast.current.weather_descriptions[0] +
          ". It is currently " +
          data.forecast.current.temperature +
          ", and feels like " +
          data.forecast.current.feelslike +
          ". The humidity is " +
          data.forecast.current.humidity +
          ".";
      }
    });
  });
});

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
//});
