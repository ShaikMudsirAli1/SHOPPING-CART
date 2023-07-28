import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import "./styles.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div>
          <Routes>
            {/* Use the "element" prop for Route components */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
