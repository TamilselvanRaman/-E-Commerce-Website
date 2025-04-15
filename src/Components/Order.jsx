import React, { useContext } from "react";
import { UserContext } from "./ProductDisplay";

function Orders() {
  const { orders } = useContext(UserContext);
  console.log(orders)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">My Orders</h2>
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="border-b p-4">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Order ID: {order.id}</p>
                <p className="text-gray-500">{new Date(order.date).toDateString()}</p>
              </div>
              <p className="text-gray-700">
                Total: <span className="font-semibold">₹{order.amount}</span>
              </p>
              <p className="text-gray-700">Status: {order.status}</p>
              <p className="font-semibold">Items Ordered:</p>
              <ul className="list-disc ml-6 text-gray-600">
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} (x{item.quantity})</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
