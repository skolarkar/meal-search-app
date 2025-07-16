import "../Menu.css";
import MealCard from "./MealCard.jsx";
import CartRedux from "./CartRedux.tsx";
import { useState, useEffect } from "react";
import "@fontsource/pacifico";

// Redux imports
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";

interface Dish {
  imageUrl: string;
  description: string;
  price: string;
}

function MenuRedux() {
  const dispatch = useAppDispatch();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch dishes from API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const protocol =
          window.location.protocol === "https:" ? "http:" : "http:";
        const apiUrl = `${protocol}//localhost:8080/api/meals`;
        const response = await fetch(apiUrl);

        const data = await response.json();
        setDishes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dishes:", error);
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Add item to cart using Redux
  const handleAddToCart = (item: {
    description: string;
    price: string;
    imageUrl?: string;
  }) => {
    dispatch(
      addToCart({
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
      })
    );
    console.log("Added to cart via Redux:", item);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#1e1b4b" }}>
      {/* Main Content */}
      <div className="flex-1 p-6 pr-20">
        {/* Add Image */}
        <div className="flex justify-center mb-4">
          <img
            src="http://localhost:8080/images/img1.jpg"
            alt="Meals"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </div>
        {/* Title */}
        <h1
          className="text-4xl font-bold font-shadow-2xl text-amber-500 text-center mb-6 shadow-lg"
          style={{
            fontFamily: "Copperplate, Papyrus, fantasy",
            textShadow: "3px 3px 10px rgba(0, 0, 0, 0.8)",
          }}
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

      {/* Redux Cart Section */}
      <CartRedux />
    </div>
  );
}

export default MenuRedux;
