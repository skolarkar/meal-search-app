import React from 'react';

function MealCard({ image, description, price, onAddToCart }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={image}
        alt={description}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{description}</h2>
        <p className="text-gray-800 font-bold mb-4">{price}</p>
        <button
          onClick={() => onAddToCart({ description, price })}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MealCard;