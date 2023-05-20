import React, {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./components/Product"
import Login from "./components/Login";
import Catalogue from "./components/Catalogue";
import { UserContext, generateHash } from './context/Usercontext';
import { FlexModal } from './components/FlexModal'

function App() {

  const [user, setUser] = useState({ firstname: '', lastname: '', email: generateHash(navigator.userAgent), product_data: [], count: 0, total: 0 });

  // Define the updateUser function
  const updateUser = (user: any) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8888/api/cart/${user.email}`);
            if (response.ok) {
                const data = await response.json();
                updateUser({
                    ...user,
                    product_data: data.product_data,
                    count: data.count,
                    total: data.total
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, updateUser }}>
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
      </UserContext.Provider>
    </div>
  );
}

export default App;
