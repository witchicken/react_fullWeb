import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <>
      NavTest
      <Link to="/">Home</Link>
      <Link to="/Home">form</Link>
      <Link to="/rotatenav">rotatenav</Link>
      <Link to="/threetest">threeTest</Link>
    </>
  );
}
export default Nav;
