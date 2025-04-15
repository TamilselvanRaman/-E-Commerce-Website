import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
import Order from "./Components/Order";
import SingleProductView from "./Components/SingleProductView";

import ProductDisplay, { UserContext } from "./Components/ProductDisplay";

function App() {
  const [pageid, setPageid] = useState(null);
  const [cartid, setCartid] = useState([]);
  const [items, setItems] = useState(0);
  const [cart, setCart] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [orders, setOrders] = useState([]);

  // console.log(SreachProducts);

  return (
    <UserContext.Provider
      value={{
        pageid,
        setPageid,
        cartid,
        setCartid,
        items,
        setItems,
        productDetail,
        setProductDetail,
        cart,
        setCart,
        orders, 
        setOrders
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product/:id" element={<SingleProductView />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
