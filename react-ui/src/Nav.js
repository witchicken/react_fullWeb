import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="simpleNav">
      네비게이션 제작중...
      <div>
        <Link to="/">Home으로 가기</Link>
      </div>
      <div>
        <Link to="/Home">weddingform</Link>
      </div>
      <div>
        <Link to="/rotatenav">rotatenav</Link>
      </div>
    </div>
  );
}
export default Nav;
