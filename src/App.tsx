import React, {useState, createContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./components/Product"
import Login from "./components/Login";
import Catalogue from "./components/Catalogue";
import { UserContext } from './context/Usercontext';




function App() {

  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', product_data: [], count: 0, total: 0 });


    // Define the updateUser function
    const updateUser = (user: any) => {
      setUser(user);
    };

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{ user, updateUser }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/catalogue' element={<Catalogue></Catalogue>}></Route>
          <Route path='/product/:id' element={<Product></Product>}></Route>
        </Routes>
        </UserContext.Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
