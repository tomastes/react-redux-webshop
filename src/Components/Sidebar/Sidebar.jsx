import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { NavSidebar } from "./NavSidebar";
import "./Sidebar.css";
import img from "../../logo.jpg";
import NavItems from "../Navigation/NavItems";
import { Avatar, Badge, IconButton } from "@material-ui/core";
import {
  FavoriteOutlined,
  PersonOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket } from "../../features/basketSlice";
import { selectLikes } from "../../features/likesSlice";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(40px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Sidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { height } = useDimensions(containerRef);
  const history = useHistory();
  const basket = useSelector(selectBasket);
  const likes = useSelector(selectLikes);
  const user = useSelector(selectUser);
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
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="sidebar_nav"
    >
      <img className="sidebar_logo" src={img} alt="" />
      <motion.div className="background" variants={sidebar} />
      <NavSidebar isOpen={isOpen} />
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
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
