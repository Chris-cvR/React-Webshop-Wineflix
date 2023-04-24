import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
