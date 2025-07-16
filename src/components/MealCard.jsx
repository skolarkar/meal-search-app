import React from "react";

function MealCard({ image, description, price, onAddToCart }) {
  // Debug logging
  console.log("MealCard props:", { image, description, price });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={image || "/placeholder-image.jpg"}
        alt={description || "Meal"}
        className="w-full h-48 object-cover"
        onError={(e) => {
          console.log("Image load error:", e.target.src);
          e.target.src = "/placeholder-image.jpg";
        }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          {description || "Unknown Dish"}
        </h2>
        <p className="text-gray-800 font-bold mb-4">{price || "$0.00"}</p>
        <button
          onClick={() => {
            console.log("Adding to cart:", { description, price });
            onAddToCart({ description, price, image });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MealCard;
