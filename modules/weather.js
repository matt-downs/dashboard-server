const axios = require("axios");

let temp = 0,
  humidity = 0;

const refreshData = async () => {
  console.log("weather: refreshing data...");
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Brisbane,au&appid=${
      process.env.WEATHER_KEY
    }&units=metric`
  );
  temp = data.main.temp;
  humidity = data.main.humidity;

  console.log("weather: done!");
};

refreshData();
setInterval(refreshData, 10 * 60 * 1000);

const renderFn = () => `
  <h2 class="m-0">${temp.toFixed(1)}ºC ${humidity}%</h2>
`;

module.exports = {
  render: renderFn
};
