import React from "react";
import "./reset.css";
import Home from "./Home";
import Formview from "./Formview";
import Nav from "./Nav";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Nav />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/formview" element={<Formview />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
