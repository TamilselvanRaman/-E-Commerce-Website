import React, { useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

function ProductDisplay() {
  const {
    setPageid,
    setCart,
    setCartid,
    setItems,
    cartid,
    productDetail,
    setProductDetail,
  } = useContext(UserContext);
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProductDetail(response?.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
    localStorage.setItem("data", JSON.stringify(productDetail));
  }, []);

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
  };

  return (
    <div className="bg-gray-100 mt-15">
      {productDetail.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ml-4">
          {productDetail.map((product) => (
            <div key={product.id} className="pl-4 text-[15px]">
              <div className="flex flex-col items-center bg-white hover:scale-105 hover:bg-gray-100 transition-transform duration-400 mt-5 p-5 drop-shadow-lg rounded-lg ">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-32 h-43 ra"
                />
                <div className="flex flex-col self-start w-full px-2">
                  <h2
                    className="text-sm truncate text-left cursor-pointer"
                    onClick={() => {
                      setPageid(product.id);
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    {product.title}
                  </h2>
                  <div className="flex flex-row">
                    <p className="font-bold">₹ {product.price}</p>
                    <p className="line-through text-gray-500 ml-2">
                      ₹{Math.floor(product.price / (1 - 0.75))}
                    </p>
                    <p className="text-green-600 pl-3">
                      {product.discountPercentage}% off
                    </p>
                  </div>
                  <div className="mt-1 flex flex-row">
                    <p className="w-13 h-full text-gray-50 bg-emerald-700 pl-1 rounded-md pb-0.5">
                      {product.rating} ☆
                    </p>
                    <p className="ml-2">({product.reviews?.length || 0})</p>
                  </div>
                  <div className="flex mt-2 ml-5">
                    <button
                      className="bg-blue-400 w-30 h-8 rounded-sm "
                      onClick={() => {
                        setCartid([...cartid, product.id]);
                        addToCart(product);
                        setItems((cur)=> cur + 1);
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="bg-green-400 w-30 h-8 rounded-sm ml-2 text-[15px]" onClick={
                      ()=>{
                        setCartid([...cartid, product.id]);
                        addToCart(product);
                        setItems((curr) => curr + 1);
                        navigate("/cart");
                      }
                    }>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="bg-white text-2xl">Please Wait page is loading... </p>
      )}
    </div>
  );
}

export default ProductDisplay;
