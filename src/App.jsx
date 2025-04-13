import './App.css';
import MealCard from './MealCard';
import Cart from './Cart';
import { useState, useEffect } from 'react';

function App() {
  const [dishes, setDishes] = useState([]); // State to store dishes
  const [loading, setLoading] = useState(true); // State to handle loading
  const [cart, setCart] = useState([]); // State to store cart items

  // Fetch dishes from API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://app:8080/api/meals',{
          method: 'GET',
          mode: 'no-cors',
        }) // Replace with your API URL
        const data = await response.json();
        setDishes(data); // Update dishes state with API data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching dishes:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchDishes();
  }, []);

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    console.log('Added to cart:', item); // Debug log
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(String(item.price).replace('$', '')) || 0;
      return total + price;
    }, 0).toFixed(2);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 p-6 pr-20"> {/* Added pr-20 for padding-right */}
        <h1 className="text-3xl font-bold text-center mb-6">Meal Search App</h1>
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
      <Cart cart={cart} calculateTotal={calculateTotal} />
    </div>
  );
}

export default App;
