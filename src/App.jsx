import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import Home2 from "./components/Home2";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
