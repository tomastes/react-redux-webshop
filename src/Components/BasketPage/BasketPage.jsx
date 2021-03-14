import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasket,
  changeAmount,
  removeFromBasket,
  qualqBasketTotal,
} from "../../features/basketSlice";
import "./BasketPage.css";
import { useHistory } from "react-router";
const BasketPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(null);
  const basket = useSelector(selectBasket);
  const removeFromBasketHandelar = (id) => {
    dispatch(removeFromBasket(id));
  };
  const subTotalQual = () => {
    return basket?.reduce(
      (initialVal, item) => parseFloat(item.price) * item.amount + initialVal,
      0
    );
  };
  const totalQual = () => {};
  useEffect(() => {
    setSubTotal(subTotalQual().toFixed(2));
    dispatch(qualqBasketTotal());
  }, [basket]);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);
  const checkoutWithIdealHandle = () => {
    history.replace("/checkout");
  };
  return (
    <div className="basketpage">
      {/* basket container */}
      <div className="basket_list_container">
        <div className="basket_header">
          {basket ? (
            <h2> you shopping basket</h2>
          ) : (
            <h2>you basket is empty</h2>
          )}
        </div>
        {/* basket list */}
        <div className="basket_list">
          {basket?.map((item) => (
            <div key={item.id} className="single_basket_list">
              <img width="50px" src={item.image} alt="" />
              <h4 onClick={(e) => removeFromBasketHandelar(item.id)}>
                {item.title} <span>remove</span>
              </h4>

              <input
                type="number"
                name=""
                min="1"
                defaultValue={item.amount}
                id=""
                onChange={(e) =>
                  dispatch(
                    changeAmount({
                      id: item.id,
                      amount: parseInt(e.target.value),
                    })
                  )
                }
              />
              <h4>{item.price}</h4>
            </div>
          ))}
        </div>
      </div>
      {/* basket total */}
      {basket?.length ? (
        <div className="basket_price_container">
          <div className="basket_price">
            <div className="basket_subtotal">
              <p className="subtotal_label">subtotal ({basket?.length})</p>
              <p className="subtotal_value">€{subTotal}</p>
            </div>
            <div className="basket_shipping">
              <p className="shipping_label">shipping cost</p>
              <p className="shipping_value">€12</p>
            </div>
            <div className="basket_total">
              <p className="grand_total_label">Grand total estimated</p>
              <p className="Grand_total">
                €{(parseFloat(subTotal) + 12).toFixed(2)}
              </p>
            </div>
          </div>

          <div
            onClick={checkoutWithIdealHandle}
            className="checkoutwithIdealContainer"
          >
            <img
              width="60px"
              height="40px"
              src="https://toppng.com/uploads/preview/ideal-betalen-vector-logo-free-download-11574102404gh9wiqsmjp.png"
              alt=""
            />
            <button className="checkout_with_ideal">
              {" "}
              checkout with ideal
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BasketPage;
