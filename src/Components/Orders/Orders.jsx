import { Badge, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { clearBasket, selectBasket } from "../../features/basketSlice";
import { selectShippingAdress, selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import firebase from "firebase";
import "./Orders.css";
const Orders = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.admin) {
      db.collection("orders")
        .get()
        .then((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      db.collection("orders")
        .where("orderOwner", "==", user?.uid)
        .get()
        .then((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, []);

  return (
    <div className="orders">
      <Badge badgeContent={orders?.length} color="primary">
        <h2>My Orders</h2>
      </Badge>

      <div className="orders_container">
        {orders?.map(
          ({
            id,
            data: {
              orderStatus,
              orderItems,
              ordernumber,
              orderOwner,
              shippingAdress,
              timestamp,
            },
          }) => (
            console.log(shippingAdress[0].shipping),
            (
              <div key={id} className="single_order">
                <h6 className="order_info">
                  order from {new Date(timestamp?.seconds * 1000).toUTCString()}{" "}
                  with id: {id}
                </h6>
                {/* details */}
                <div className="single_order_details">
                  {/* items list */}
                  <div className="single_order_items_container">
                    {orderItems.map((item) => (
                      <div key={item.id} className="order_item">
                        <div className="image_container">
                          <img src={item.image} alt="" />
                        </div>

                        <h6>{item.title}</h6>
                        <h6>{item.author}</h6>
                        <h6>${item.price}.00</h6>
                        <h6 className="status">{orderStatus}</h6>
                      </div>
                    ))}
                  </div>
                  {/* shipping info */}
                  <div className="single_order_shipping_info">
                    <div className="map_container"></div>
                    <div className="shipping_adress">
                      <p className="name">
                        {shippingAdress[0].shipping.name.full_name}
                      </p>
                      <p className="adress_">
                        {shippingAdress[0].shipping.address.adress_line_1}
                      </p>
                      <p className="adress_">
                        {shippingAdress[0].shipping.address.admin_area_1}
                      </p>
                      <p className="adress_">
                        {shippingAdress[0].shipping.address.admin_area_2}
                      </p>
                      <p className="adress_">
                        {shippingAdress[0].shipping.address.country_code}
                      </p>
                      <p className="adress_">
                        {shippingAdress[0].shipping.address.postal_code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
