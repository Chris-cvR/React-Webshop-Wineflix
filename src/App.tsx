import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel"
import Login from "./components/Login";
import catalogue from "./components/Catalogue";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/test' element={<Carousel endpoint={"api/products/category/red"}></Carousel>}>
          <Route path='/login' Component={Login}></Route>
        <Route path='/catalogue' Component={catalogue}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
