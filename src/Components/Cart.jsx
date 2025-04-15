import { useContext, useEffect, useState } from "react";
import { UserContext } from "./ProductDisplay";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart, setOrders, setItems } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  console.log(products);
  // Sync products with cart when cart updates
  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  // Increase quantity & update cart
  const adding = (id) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Decrease quantity & update cart
  const removing = (id) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
          : product
      )
    );
  };

  // Calculate total price
  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Handle checkout
  const handleCheckout = () => {
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        id: Math.floor(Math.random() * 10000),
        date: new Date().toISOString(),
        amount: totalPrice,
        status: "Processing",
        items: products.map((p) => ({ name: p.title, quantity: p.quantity })),
      },
    ]);

    setCart([]); // Empty the cart
    setItems(0);
    navigate("/order");
  };

  return (
    <div className="p-5 flex flex-col bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Cart</h2>

      {products.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Cart Items */}
          <div className="w-full lg:w-3/4 p-4 bg-white rounded-lg shadow-md">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-b p-4 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                  <p className="text-green-600 font-bold">₹{product.price}</p>
                  <p className="text-gray-400 text-sm line-through">
                    ₹{(product.price / (1 - 0.15)).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removing(product.id)}
                    className={`px-3 py-1 bg-red-500 text-white rounded ${
                      product.quantity <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <p className="text-lg font-semibold">{product.quantity}</p>
                  <button
                    onClick={() => adding(product.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="text-lg font-semibold">
                  ₹{(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Price Summary */}
          <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Price Details</h3>
            <div className="text-gray-700">
              <div className="flex justify-between">
                <p>Price ({products.length} items)</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p className="text-green-600">
                  -₹{(totalPrice * 0.15).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p>
                  <span className="line-through text-gray-400">₹40</span>{" "}
                  <span className="text-green-600">Free</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p>Secured Packaging Fee</p>
                <p>₹10</p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between font-bold text-xl mt-4">
              <p>Total Amount</p>
              <p>₹{(totalPrice - totalPrice * 0.15 + 10).toFixed(2)}</p>
            </div>
            <p className="text-green-600 text-sm mt-1">
              You saved ₹{(totalPrice * 0.15).toFixed(2)} on this order!
            </p>

            {/* Checkout Button */}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
