import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Components/ProductDisplay";
import { ShoppingCart, Search, User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { setProductDetail, items } = useContext(UserContext);
  console.log(items)

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${input}`
      );
      setProductDetail(response?.data.products);
      navigate("/");
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <nav className="w-full h-16 flex items-center px-6 bg-white shadow-md justify-between fixed top-0 left-0 z-50">
      {/* Left Section - Logo & Search Bar */}
      <div className="flex items-center gap-5">
        {/* Logo */}
        <Link to="/">
          <img
            src="logo.png"
            alt="Logo"
            className="w-20 h-10 cursor-pointer rounded-4xl"
          />
        </Link>

        {/* Search Bar */}
        <div className="relative w-72 md:w-96 lg:w-[400px]">
          <input
            type="search"
            placeholder="Search for products, brands..."
            className="w-full h-10 pl-4 pr-12 text-[15px] rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-2 text-gray-600 hover:text-blue-500"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Right Section - Cart & User Account */}
      <div className="flex items-center gap-6">
        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative flex items-center">
          <ShoppingCart size={24} className="text-gray-800 hover:text-blue-500" />
          {items > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {items}
            </span>
          )}
        </Link>

        {/* User Dropdown Menu */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <User size={20} className="text-gray-700" />
            <span className="text-gray-800 font-medium">My Account</span>
          </button>
          <div className="hidden group-hover:block absolute right-0 mt-1 w-40 bg-white shadow-md rounded-lg p-3 z-index-30">
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-blue-500 p-2 rounded-lg hover:bg-gray-100">
                <Link to="/profile">My Profile</Link>
              </li>
              <li className="cursor-pointer hover:text-blue-500 p-2 rounded-lg hover:bg-gray-100">
                SuperCoin Zone
              </li>
              <li className="cursor-pointer hover:text-blue-500 p-2 rounded-lg hover:bg-gray-100">
                <Link to="/order">Orders</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
