import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Import styles for react-resizable

// Import the exotic font
import "@fontsource/pacifico"; // Install via npm: npm install @fontsource/pacifico

function Cart({ cart, onRemoveFromCart }) {
  const nodeRef = useRef(null); // Create a ref for the draggable container
  const [isMinimized, setIsMinimized] = useState(false); // State to toggle minimize/maximize

  // Calculate subtotal (without taxes)
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(String(item.price).replace("$", "")) || 0;
      return total + price;
    }, 0);
  };

  // Calculate tax amount
  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * 5) / 100; // 5% tax
  };

  //Calculate total = subtotal+tax
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return (subtotal + calculateTax()).toFixed(2); // Add taxes and format to 2 decimal places
  };

  // Dynamically calculate the height of the cart based on the number of items
  const cartHeight = Math.min(150 + cart.length * 50, 400); // Minimum height: 150px, Maximum height: 400px

  return (
    <div
      className="fixed bottom-4 right-4 z-50" // Fixed position at the bottom-right corner
      style={{ width: "320px" }} // Fixed width for the cart container
    >
      <Draggable nodeRef={nodeRef}>
        <ResizableBox
          width={320} // Fixed width
          height={isMinimized ? 50 : cartHeight} // Toggle height based on minimized state
          minConstraints={[320, 50]} // Minimum width and height
          maxConstraints={[600, 400]} // Maximum width and height
          resizeHandles={isMinimized ? [] : ["se", "sw", "e", "w", "n", "s"]} // Disable resizing when minimized
        >
          <div
            ref={nodeRef} // Attach the ref to the draggable container
            className="w-full h-full bg-blue-100 bg-opacity-30 shadow-lg rounded-lg flex flex-col border border-yellow-200 cursor-move"
          >
            {/* Fixed Heading */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-blue-300 rounded-t-lg shadow-md flex justify-between items-center">
              <h2
                className="text-3xl text-amber-950 tracking-wide text-center flex-1"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                🛒 Your Cart
              </h2>
              <button
                className="text-white bg-blue-600 hover:bg-blue-700 rounded px-2 py-1 text-sm"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? "Maximize" : "Minimize"}
              </button>
            </div>

            {/* Scrollable Content */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 text-sm text-blue-700">
                {cart.length === 0 ? (
                  <p className="text-gray-500 italic">Your cart is empty.</p>
                ) : (
                  <div>
                    <ul className="mb-2 space-y-2">
                      {cart.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <span className="font-medium flex-1 truncate">
                            {item.description}
                          </span>
                          <span className="text-blue-600 font-semibold w-20 text-right">
                            {item.price}
                          </span>
                          <button
                            className="text-red-500 hover:text-red-700 ml-2 text-xs flex items-center"
                            onClick={() => onRemoveFromCart(index)}
                          >
                            🗑️ <span className="ml-1">Remove</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t pt-2 mt-2 space-y-1">
                      <div className="flex justify-between text-sm font-bold text-blue-700">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-blue-700">
                        <span>Tax (5%):</span>
                        <span>${calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-1 mt-1">
                        <div className="flex justify-between text-lg font-bold text-blue-800">
                          <span>Total:</span>
                          <span>${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Checkout Button */}
            {!isMinimized && (
              <div className="p-4 bg-blue-100 rounded-b-lg">
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </ResizableBox>
      </Draggable>
    </div>
  );
}

export default Cart;
