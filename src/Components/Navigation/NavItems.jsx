import React from "react";
import {
  FavoriteOutlined,
  PersonOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
const NavItems = () => {
  const user = useSelector(selectUser);
  return (
    <div className="nav_items">
      <h6 className="nav_item">
        {" "}
        <NavLink
          to="/"
          exact
          activeStyle={{
            color: "black",
          }}
        >
          Home
        </NavLink>
      </h6>
      <h6 className="nav_item">
        <NavLink
          to="/shop"
          activeStyle={{
            color: "black",
          }}
        >
          Shop
        </NavLink>
      </h6>
      {user?.admin && (
        <>
          <h6 className="nav_item">
            <NavLink
              to="/admin-addproducts"
              activeStyle={{
                color: "black",
              }}
            >
              add products
            </NavLink>
          </h6>
        </>
      )}
      {user && (
        <>
          <h6 className="nav_item">
            <NavLink
              to="orders"
              activeStyle={{
                color: "black",
              }}
            >
              orders{" "}
            </NavLink>
          </h6>
        </>
      )}
      {!user?.admin && (
        <>
          <h6 className="nav_item">
            <NavLink
              to="/News"
              activeStyle={{
                color: "black",
              }}
            >
              News
            </NavLink>
          </h6>

          <h6 className="nav_item">
            {" "}
            <NavLink
              to="/about"
              activeStyle={{
                color: "black",
              }}
            >
              about
            </NavLink>
          </h6>
        </>
      )}
    </div>
  );
};

export default NavItems;
