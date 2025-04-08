import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import Home2 from "./components/Home2";
import Footer from "./components/Footer";
import AdsComponent from "./AdsComponent";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
      </Routes>
      <div>
        <h1>Place To show Google AdSense</h1>
        <AdsComponent dataAdSlot="X7XXXXXX5X" />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
