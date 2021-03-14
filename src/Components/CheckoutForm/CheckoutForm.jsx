import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  IdealBankElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasket,
  selectBasketTotal,
  selectOrderNummer,
  setOrderNummer,
} from "../../features/basketSlice";
import axios from "../../axios";
import { selectShippingAdress, selectUser } from "../../features/userSlice";
import { Button } from "@material-ui/core";

const CheckoutForm = ({ handleBack }) => {
  const history = useHistory();
  const search = useLocation().search;
  const redirect_status = new URLSearchParams(search).get("redirect_status");
  const user = useSelector(selectBasketTotal);
  const orderNumber = useSelector(selectOrderNummer);
  const shippingAdress = useSelector(selectShippingAdress);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const basket = useSelector(selectBasket);
  const [clientSecret, setclientSecret] = useState(null);
  const basketTotal = useSelector(selectBasketTotal);

  const IDEAL_ELEMENT_OPTIONS = {
    // Custom styling can be passed to options when creating an Element
    style: {
      base: {
        padding: "16px 12px",
        color: "green",

        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
    },
  };
  useEffect(() => {
    if (redirect_status) {
      console.log(redirect_status);
    } else {
    }
  }, []);
  useEffect(() => {
    const fetchSecretIntent = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${basketTotal * 100}`,
      });
      console.log(response);
      dispatch(setOrderNummer(response.data.orderNumber));
      setclientSecret(response.data.clientSecret);
    };
    return fetchSecretIntent();
  }, [basket]);

  const IdealBanKSection = () => (
    <>
      <label style={{ marginLeft: "20%" }}>choose your bank</label>
      <div
        style={{
          border: "1px solid gray",
          margin: "10px",
          width: "60%",
          marginLeft: "20%",
        }}
      >
        <IdealBankElement options={IDEAL_ELEMENT_OPTIONS} />
      </div>
    </>
  );

  // handle payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clientSecret);
    if (!stripe || !elements) {
      return;
    }

    const idealBank = elements.getElement(IdealBankElement);
    if (clientSecret) {
      console.log(clientSecret);
      console.log(orderNumber);
      const { error, paymentIntent } = await stripe.confirmIdealPayment(
        clientSecret,
        {
          payment_method: {
            ideal: idealBank,
            billing_details: {
              address: {
                city: `${shippingAdress.city}`,
                country: `${shippingAdress.shippingCountry.split(",")[0]}`,
                line1: `${shippingAdress.address1}`,
                line2: null,
                postal_code: `${shippingAdress.zip}`,
              },
              email: user.email,
              name: `${shippingAdress.firstName} ${shippingAdress.lastName}`,
              phone: null,
            },
          },
          // add ordernummber to overcome double order on refresh
          return_url: `http://localhost:3000/paymentStatus?ordernummer=${orderNumber}`,
        }
      );
      console.log(error);
      console.log(paymentIntent);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <IdealBanKSection />
        <button
          style={{
            marginLeft: "20%",
            padding: ".7rem 1rem",
            border: "none",
            outline: "none",
            fontWeight: "600",
            color: "gray",
            border: "1px solid rgb(10, 157, 160)",
            background: "white",
            cursor: "pointer",
          }}
          type="submit"
        >
          submit payment
        </button>
      </form>
      <Button onClick={handleBack}>back</Button>
    </>
  );
};

export default CheckoutForm;
