import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Test from "./components/Test"
import Login from "./components/Login";
import catalogue from "./components/Catalogue";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/test' element={<Test endpoint={"api/products/category/red"}></Test>}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/catalogue' Component={catalogue}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
