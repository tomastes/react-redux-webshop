const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51HQxhfBBaXrOCD0NgKYNizhuQMRXjczAxhBm95lNm5Qwug5JoTZVkPUAw7Eop1DXewnzob0OTl5bo0a4SUZ97Zmc00xtqt1CfM"
);
//!app config
const app = express();

//!middlewares
app.use(cors({ origin: true }));
app.use(bodyParser.json());
//!api routes
app.get("/", (req, res) => {
  res.status(200).send("hello tomas");
});

//!payment intent
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log(total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
    payment_method_types: ["ideal", "card"],
  });
  //oke good
  res.status(201).send({
    orderNumber: paymentIntent.created,
    clientSecret: paymentIntent.client_secret,
  });
});

exports.app = functions.https.onRequest(app);
