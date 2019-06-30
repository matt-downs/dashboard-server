const axios = require("axios");

let ltc;

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

module.exports.getLtc = () => {
  return `ltc=${ltc.toFixed(2)}`;
};
