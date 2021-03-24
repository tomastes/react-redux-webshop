import { Avatar, Badge, IconButton } from "@material-ui/core";
import {
  FavoriteOutlined,
  PersonOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { selectBasket } from "../../features/basketSlice";
import { selectLikes } from "../../features/likesSlice";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import img from "../../logo.jpg";
import "./Navigation.css";
import NavItems from "./NavItems";
const Navigation = () => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const likes = useSelector(selectLikes);
  const dispatch = useDispatch();
  const signOutHandle = () => {
    if (user) {
      auth.signOut();
      dispatch(logout());
      history.replace("/login");
    } else {
      history.replace("/login");
    }
  };
  return (
    <div className="Navigation">
      {/* logo */}
      <div className="app__logo">
        <img src={img} alt="" />
      </div>
      {/* links */}
      <NavItems />
      {/* icons and badges */}
      <div className="nav_left">
        {!user?.admin && (
          <>
            <IconButton onClick={(e) => history.push("/basket")}>
              <Badge badgeContent={basket?.length} color="primary">
                <ShoppingBasketOutlined color="primary" fontSize="large" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={likes?.length} color="primary">
                <FavoriteOutlined
                  fontSize="large"
                  style={{ color: "rgba(194, 3, 3, 0.493)" }}
                />
              </Badge>
            </IconButton>
          </>
        )}
        {user ? (
          <IconButton onClick={signOutHandle}>
            <Avatar
              src={user?.photoUrl}
            >{`${user?.displayName[0]}${user?.displayName[1]}`}</Avatar>
          </IconButton>
        ) : (
          <IconButton onClick={signOutHandle}>
            <PersonOutlined />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Navigation;
