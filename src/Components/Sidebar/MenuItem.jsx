import * as React from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
const classes = makeStyles({
  nav_item: {
    textDecoration: "none",
    marginLeft: "1.5rem",
    fontSize: "19px",
    color: "gray",

    textTransform: "capitalize",
    fontWeight: "600",
  },
});
export const MenuItem = ({ i, name, link, Icon, onlyAdmin }) => {
  const clases = classes();
  const user = useSelector(selectUser);
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <>
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button component={Link} to={link}>
          <IconButton className="icon-placeholder" style={style}>
            <Icon />
          </IconButton>
          <div
            className="text-placeholder"
            style={{ borderBottom: `2px solid ${colors[i]}` }}
          >
            <h6 className={clases.nav_item}> {name}</h6>
          </div>
        </Button>
      </motion.li>
    </>
  );
};
