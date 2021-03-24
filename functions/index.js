const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const stripe = require("stripe")(functions.config().stripe.key);
//
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
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const event = request.body;
    console.log(request);
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);
exports.app = functions.https.onRequest(app);
