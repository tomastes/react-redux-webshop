import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { clearBasket, selectBasket } from "../../features/basketSlice";
import { selectShippingAdress, selectUser } from "../../features/userSlice";
import { db } from "../../firebase";

const PaymentStatus = () => {
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const shippingAdress = useSelector(selectShippingAdress);
  const history = useHistory();
  const search = useLocation().search;
  const dispatch = useDispatch();
  const redirect_status = new URLSearchParams(search).get("redirect_status");
  const ordernummer = new URLSearchParams(search).get("ordernummer");
  const [failed, setFailed] = useState(false);
  const [payed, setPayed] = useState(false);
  useEffect(() => {
    if (redirect_status) {
      if (redirect_status === "succeeded") {
        db.collection("orders").add({
          orderItems: { ...basket },
          orderOwner: user?.uid,
          shippingAdress: JSON.parse(localStorage.getItem("shippingAdress")),
          ordernumber: ordernummer,
        });
        localStorage.removeItem("basket");
        localStorage.removeItem("shippingAdress");
        dispatch(clearBasket());
        setPayed(true);
      }
      if (redirect_status === "failed") {
        localStorage.removeItem("basket");
        localStorage.removeItem("shippingAdress");
        dispatch(clearBasket());
        setFailed(true);
        history.replace(`/paymentStatus`);
      }
    }
  }, []);

  return (
    <div>
      {payed && (
        <>
          <h2>thankyou </h2>
          <h4>your order is completed successfully</h4>
          <Button component={Link} variant="outlined" to="/shop">
            Back to shop
          </Button>
        </>
      )}
      {failed && (
        <>
          <h2>sorry </h2>
          <h4>your payment is failed </h4>
          <Button component={Link} variant="outlined" to="/shop">
            Back to shop
          </Button>
        </>
      )}
    </div>
  );
};

export default PaymentStatus;
