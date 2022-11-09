import React, { useState } from "react";
import "./Rotatenav.scss";

import Snow from "./components/Snow.js";
import Rain from "./components/Rain.js";
import Sunny from "./components/Sunny.js";
import Night from "./components/Night.js";
import Typhoon from "./components/Typhoon.js";

function Rotatenav() {
  const [nowView, setNowView] = useState(0);
  const $nav = document.querySelector(".nav");

  switch (nowView) {
    case 0:
      break;
    case 1:
      $nav.style.transform = "rotate(-40deg)";
      $nav.style.backgroundColor = "white";
      break;
    case 2:
      $nav.style.transform = "rotate(-113deg)";
      break;
    case 3:
      $nav.style.transform = "rotate(-180deg)";
      break;
    case 4:
      $nav.style.transform = "rotate(-249deg)";
      break;
    case 5:
      $nav.style.transform = "rotate(-322deg)";
      break;

    default:
      $nav.style.transform = "rotate(40deg)";
      break;
  }

  function navClick({ target }) {
    switch (target.innerText || target.children[0].innerText) {
      case "snow":
        setNowView(1);
        break;
      case "rain":
        setNowView(2);
        break;
      case "sunny":
        setNowView(3);
        break;
      case "space":
        setNowView(4);
        break;
      case "3D":
        setNowView(5);
        break;
      default:
        break;
    }
    if (target.matches(".nav > div") || target.matches(".nav > div > span")) {
      [...document.querySelector(".nav").children].forEach(($part) => {
        $part.classList.toggle(
          "nav_active",
          $part === target || $part === target.parentNode
        );
      });
    } else {
      return;
    }
  }

  return (
    <div className="App">
      <nav className="nav" onClick={navClick}>
        <div className="partial snow nav_active">
          <span>snow</span>
        </div>
        <div className="partial rain">
          <span>rain</span>
        </div>
        <div className="partial sunny">
          <span>sunny</span>
        </div>
        <div className="partial night">
          <span>space</span>
        </div>
        <div className="partial typhoon">
          <span>3D</span>
        </div>
      </nav>

      {(() => {
        switch (nowView) {
          case 1:
            return <Snow />;
          case 2:
            return <Rain />;
          case 3:
            return <Sunny />;
          case 4:
            return <Night />;
          case 5:
            return <Typhoon />;
          default:
            return <Snow />;
        }
      })()}
    </div>
  );
}

export default Rotatenav;
