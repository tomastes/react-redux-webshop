import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import {
  HomeOutlined,
  ShoppingBasketOutlined,
  HistoryOutlined,
  NewReleasesTwoTone,
  AddOutlined,
  DescriptionOutlined,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const NavSidebar = ({ isOpen }) => (
  <>
    {isOpen && (
      <motion.ul variants={variants}>
        {itemIds.map((item, index) => (
          <MenuItem
            i={index}
            key={index}
            name={item.name}
            link={item.link}
            Icon={item.icon}
            onlyAdmin={item.onlyAdmin}
          />
        ))}
      </motion.ul>
    )}
  </>
);

const itemIds = [
  { name: "home", link: "/", icon: HomeOutlined },
  { name: "shop", link: "/shop", icon: ShoppingBasketOutlined },
  { name: "orders", link: "/orders", icon: HistoryOutlined },
  { name: "about", link: "/about", icon: DescriptionOutlined },
  { name: "newReleases", link: "/news", icon: NewReleasesTwoTone },
  // {
  //   name: "addProducts",
  //   link: "/admin-addProducts",
  //   icon: AddOutlined,
  // },
];
//!TODO: ==> items(links) array with name,icon,linkTo
//?-->
