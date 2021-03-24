import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import { Sidebar } from "../../Sidebar/Sidebar";
import { useResizeDetector } from "react-resize-detector";

const NavContainer = () => {
  const [mobile] = useState(false);
  const { width, height, ref } = useResizeDetector();

  return (
    <div ref={ref} style={{ position: "sticky", top: 0, height: "100%" }}>
      {width > 650 ? <Navigation /> : <Sidebar />}
    </div>
  );
};

export default NavContainer;
