import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./ProductDisplay";

function SingleProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCart, setItems } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gotocart, setGotocart] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response?.data);
        setSelectedImage(response?.data?.images?.[0] || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setGotocart(true);
    setItems((cur) => cur + 1);
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="p-5 flex flex-col lg:flex-row font-serif">
      {/* Left Side - Product Images */}
      <div className="flex flex-col gap-5 items-center lg:w-1/2">
        <div className="bg-gray-50 rounded-md p-5">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-80 h-80 object-contain"
          />
        </div>
        <div className="flex gap-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className="w-16 h-16 object-cover cursor-pointer border rounded-md hover:border-blue-500"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="lg:w-1/2 p-5">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-2 text-green-600">{product.availabilityStatus}</p>
        <p className="mt-2 font-semibold">Brand: {product.brand}</p>
        <p className="text-gray-500">SKU: {product.sku}</p>
        <p className="text-gray-500">Weight: {product.weight}kg</p>

        <div className="mt-4 flex gap-2 items-center">
          <p className="text-emerald-500 bg-emerald-100 p-1 rounded-md">
            ⭐ {product.rating}
          </p>
          <p className="text-gray-600">
            ({product.reviews?.length || 0} reviews)
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <p className="text-xl font-bold">₹ {product.price}</p>
          <p className="line-through text-gray-500">
            ₹
            {(product.price / (1 - product.discountPercentage / 100)).toFixed(
              2
            )}
          </p>
          <p className="text-green-600">{product.discountPercentage}% off</p>
        </div>

        <p className="mt-2 text-gray-700">
          Return Policy: {product.returnPolicy}
        </p>
        <p className="text-gray-700">Shipping: {product.shippingInformation}</p>
        <p className="text-gray-700">Warranty: {product.warrantyInformation}</p>

        {/* Add to Cart & Buy Now Buttons */}
        <div className="flex gap-3 mt-5">
          {gotocart ? (
            <button
              className="bg-yellow-500 px-5 py-2 rounded-md text-white hover:bg-yellow-600"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>
          ) : (
            <button
              className="bg-blue-500 px-5 py-2 rounded-md text-white hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          )}

          <button className="bg-green-500 px-5 py-2 rounded-md text-white hover:bg-green-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProductView;
