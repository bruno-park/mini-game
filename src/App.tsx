import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Container from "./components/Container";
import { BrowserRouter } from "react-router-dom";
import Redirect from "./Redirect";

function App() {
  return (
    <BrowserRouter>
      <Redirect />
    </BrowserRouter>
  );
}

export default App;
