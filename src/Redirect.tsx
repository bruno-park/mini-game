import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "./pages/Spinner";
const Redirect = () => {
  return (
    <Routes>
      <Route path="/" element={<Spinner />} />
    </Routes>
  );
};

export default Redirect;
