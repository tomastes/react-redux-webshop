import classes from "./Footer.module.css";
import { Icon, IconButton, makeStyles, Typography } from "@material-ui/core";
import {
  Facebook,
  GitHub,
  Instagram,
  Telegram,
  Twitter,
  YouTube,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

// const styles = makeStyles({
//   Footer: {},
//   Sitemap: {},
//   information: {},
//   Account: {},
//   Social_links: {},
// });
const Footer = () => {
  //   const classes = styles();
  return (
    <div className={classes.Footer}>
      {/* sitemap */}
      {/* social links */}
      <div className={classes.Social_links}>
        <Typography variant="h6"> Follow us on Social media</Typography>
        <IconButton rel="noreferrer" target="_blank" href="#">
          <Facebook style={{ color: "#1877f2" }} />
        </IconButton>

        <IconButton rel="noreferrer" target="_blank" href="#">
          <Twitter style={{ color: "#1da1f2" }} />
        </IconButton>

        <IconButton rel="noreferrer" target="_blank" href="#">
          <YouTube style={{ color: "#ff0000" }} />
        </IconButton>

        <IconButton rel="noreferrer" target="_blank" href="#">
          <Instagram style={{ color: " #f46f30" }} />
        </IconButton>

        <IconButton rel="noreferrer" target="_blank" href="#">
          <Telegram style={{ color: " #0088cc" }} />
        </IconButton>
      </div>
      <div className={classes.copyWright}>
        <p>
          {" "}
          copy Wright © 2021. developed by <span>
            tomasberhe1999@gmail.com
          </span>{" "}
          <IconButton rel="noreferrer" target="_blank" href="#">
            <GitHub style={{ color: " black" }} />
          </IconButton>
        </p>
      </div>
    </div>
  );
};

export default Footer;
