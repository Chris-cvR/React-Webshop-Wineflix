import React, {useState, createContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./components/Product"
import Login from "./components/Login";
import Catalogue from "./components/Catalogue";
import  {userContext, user} from './context/Usercontext';

export const UserContext = createContext<userContext>({
  user: { firstname :"" , lastname: "", email: ""},

updateUser : () => {},
});






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/catalogue' element={<Catalogue></Catalogue>}></Route>
          <Route path='/product/:id' element={<Product></Product>}></Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
