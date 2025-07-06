<<<<<<< HEAD:src/Menu.jsx
import "./Menu.css";
=======
import "./App.css";
>>>>>>> 6cc6542b633fece8a7df710006411a0267d0a9d6:src/App.jsx
import MealCard from "./MealCard";
import Cart from "./Cart";
import { useState, useEffect } from "react";
// Import the Pacifico font
import "@fontsource/pacifico";

function Menu() {
  const [dishes, setDishes] = useState([]); // State to store dishes
  const [loading, setLoading] = useState(true); // State to handle loading
  const [cart, setCart] = useState([]); // State to store cart items

  // Fetch dishes from API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const protocol =
          window.location.protocol === "https:" ? "http:" : "http:";
        const apiUrl = `${protocol}//localhost:8080/api/meals`;
        const response = await fetch(apiUrl); // Replace with your API URL

        const data = await response.json();
        setDishes(data); // Update dishes state with API data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching dishes:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchDishes();
  }, []);

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    console.log("Added to cart:", item); // Debug log
  };

  // Function to remove an item from the cart
  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Calculate total price
  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      const price = parseFloat(String(item.price).replace("$", "")) || 0;
      return total + price;
    }, 0);

    return addTaxes(subtotal).toFixed(2);
  };

  // Add taxes to the total
  const addTaxes = (subtotal) => {
    const tax = (subtotal * 2) / 100; // 2% tax
    return subtotal + tax;
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6 pr-20">
        {" "}
        {/* Added pr-20 for padding-right */}
        {/* Add Image */}
        <div className="flex justify-center mb-4">
          <img
            src="http://localhost:8080/images/img1.jpg" // Replace with your image URL
            alt="Meals"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </div>
        {/* Title */}
        <h1
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500 text-center mb-6 shadow-md border-amber-700 border-4 rounded-lg p-4"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          Menu
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish, index) => (
              <MealCard
                key={index}
                image={dish.imageUrl}
                description={dish.description}
                price={dish.price}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Section */}
<<<<<<< HEAD:src/Menu.jsx
      <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
=======
      <Cart
        cart={cart}
        calculateTotal={calculateTotal}
        onRemoveFromCart={handleRemoveFromCart}
      />
>>>>>>> 6cc6542b633fece8a7df710006411a0267d0a9d6:src/App.jsx
    </div>
  );
}

export default Menu;
