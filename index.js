const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.get("/btc/transaction-hash", (req, res) => {
  // TODO: change headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  axios
    .get("https://api.blockchain.info/charts/hash-rate?format=json")
    .then(data => {
      res.send({ data: JSON.stringify(data.data) });
    })
    .catch(err => console.warn(err));
});

app.get("/search/:hash", (req, res) => {
  let sample =
    "f854aebae95150b379cc1187d848d58225f3c4157fe992bcd166f58bd5063449";

  console.log("got on the server req.params.hash", req.params.hash);
  const transactionHash = req.params.hash;
  axios
    .get(`https://api.blockcypher.com/v1/btc/main/txs/${transactionHash}`)
    .then(data => {
      console.log(data.data);
      res.send({ data: JSON.stringify(data.data) });
    })
    .catch(err => console.warn(err));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
