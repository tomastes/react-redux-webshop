import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketTotal,
  basket,
  selectBasket,
  clearBasket,
  setSpinner,
} from "../../features/basketSlice";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import firebase from "firebase";
import { useHistory } from "react-router";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Paypal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const createOrder = (data, actions) => {
    if (!user) {
      history.replace("/login");
    }
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: basketTotal,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    actions.order.capture().then(({ id, status, payer, purchase_units }) => {
      const customerAdress = {
        ...purchase_units,
      };

      if (status === "COMPLETED") {
        console.log(purchase_units);
        if (basket?.length) {
          db.collection("orders").add({
            orderItems: basket,
            orderOwner: user?.uid,
            shippingAdress: customerAdress,
            ordernumber: id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            orderStatus: "ordered",
          });
          basket?.forEach((item) => {
            db.collection("products")
              .doc(item.id)
              .update({ amount: item?.inStock - item?.amount });
          });
          localStorage.removeItem("basket");
          dispatch(clearBasket());
          history.replace("/orders");
        }
      }
    });
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default Paypal;
