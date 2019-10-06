const axios = require("axios");

let ltc = 0;

const refreshData = async () => {
  console.log("crypto: refreshing data...");
  const { data } = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=LTC&convert=AUD",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CRYPTO_KEY
      }
    }
  );

  ltc = data.data["LTC"].quote.AUD.price;

  console.log("crypto: done!");
};

refreshData();
setInterval(refreshData, 30 * 60 * 1000);

module.exports.render = () => `
  <h2 class="m-0">ltc $${ltc.toFixed(2)}</h2>
`;
