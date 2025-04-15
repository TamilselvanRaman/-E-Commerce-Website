import React, { useState } from "react";
import { User, Mail, Phone, MapPin, ShoppingCart, Heart, Edit3 } from "lucide-react";

function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 98765 43210",
    address: "123, Main Street, New York, USA",
  });

  const [orders] = useState([
    { id: "#12345", date: "Mar 10, 2024", amount: "₹3,499", status: "Delivered" },
    { id: "#12346", date: "Mar 05, 2024", amount: "₹2,199", status: "Shipped" },
    { id: "#12347", date: "Feb 28, 2024", amount: "₹1,599", status: "Processing" },
  ]);

  const [wishlist] = useState([
    { title: "Apple iPhone 14", price: "₹69,999" },
    { title: "Samsung Galaxy S23", price: "₹54,999" },
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-15" >
      {/* User Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My Profile</h2>
          <button className="flex items-center text-blue-500 hover:text-blue-700">
            <Edit3 className="w-4 h-4 mr-1" /> Edit Profile
          </button>
        </div>
        <div className="mt-4 space-y-3">
          <p className="flex items-center text-gray-700"><User className="w-5 h-5 mr-2 text-blue-500" /> {user.name}</p>
          <p className="flex items-center text-gray-700"><Mail className="w-5 h-5 mr-2 text-blue-500" /> {user.email}</p>
          <p className="flex items-center text-gray-700"><Phone className="w-5 h-5 mr-2 text-blue-500" /> {user.phone}</p>
          <p className="flex items-center text-gray-700"><MapPin className="w-5 h-5 mr-2 text-blue-500" /> {user.address}</p>
        </div>
      </div>

      {/* Order History */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2 text-green-500" /> Order History
        </h2>
        {orders.map((order) => (
          <div key={order.id} className="flex justify-between p-3 border-b">
            <p>{order.id}</p>
            <p>{order.date}</p>
            <p className="font-semibold">{order.amount}</p>
            <p className={`text-sm ${order.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>{order.status}</p>
          </div>
        ))}
      </div>

      {/* Wishlist */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500" /> Wishlist
        </h2>
        {wishlist.map((item, index) => (
          <div key={index} className="flex justify-between p-3 border-b">
            <p>{item.title}</p>
            <p className="font-semibold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
