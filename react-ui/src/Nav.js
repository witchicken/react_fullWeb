import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <>
      NavTest
      <Link to="/">Home</Link>
      <Link to="/Home">form</Link>
    </>
  );
}
export default Nav;
