import React, { useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "@fontsource/pacifico";

// Type definitions
interface CartItem {
  description: string;
  price: string;
  imageUrl?: string;
  quantity?: number;
}

interface BaseCartProps {
  items: CartItem[];
  isMinimized: boolean;
  onMinimizeToggle: () => void;
  onRemoveFromCart: (index: number) => void;
  subtotal: string;
  tax: string;
  total: string;
  taxRate?: number;
}

const BaseCart: React.FC<BaseCartProps> = ({
  items,
  isMinimized,
  onMinimizeToggle,
  onRemoveFromCart,
  subtotal,
  tax,
  total,
  taxRate = 5,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic height
  const cartHeight: number = Math.min(150 + items.length * 50, 400);

  return (
    <div className="fixed bottom-4 right-4 z-50" style={{ width: "320px" }}>
      <Draggable nodeRef={nodeRef as React.RefObject<HTMLElement>}>
        <ResizableBox
          width={320}
          height={isMinimized ? 50 : cartHeight}
          minConstraints={[320, 50]}
          maxConstraints={[600, 400]}
          resizeHandles={isMinimized ? [] : ["se", "sw", "e", "w", "n", "s"]}
        >
          <div
            ref={nodeRef}
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
                onClick={onMinimizeToggle}
                type="button"
              >
                {isMinimized ? "Maximize" : "Minimize"}
              </button>
            </div>

            {/* Scrollable Content */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 text-sm text-blue-700">
                {items.length === 0 ? (
                  <p className="text-gray-500 italic">Your cart is empty.</p>
                ) : (
                  <div>
                    <ul className="mb-2 space-y-2">
                      {items.map((item: CartItem, index: number) => (
                        <li
                          key={index}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <div className="flex-1">
                            <span className="font-medium truncate block">
                              {item.description}
                            </span>
                            {item.quantity && item.quantity > 1 && (
                              <span className="text-xs text-gray-500">
                                x{item.quantity}
                              </span>
                            )}
                          </div>
                          <span className="text-blue-600 font-semibold w-20 text-right">
                            {item.price}
                          </span>
                          <button
                            className="text-red-500 hover:text-red-700 ml-2 text-xs flex items-center"
                            onClick={() => onRemoveFromCart(index)}
                            type="button"
                          >
                            🗑️ <span className="ml-1">Remove</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t pt-2 mt-2 space-y-1">
                      <div className="flex justify-between text-sm font-bold text-blue-700">
                        <span>Subtotal:</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-blue-700">
                        <span>Taxes ({taxRate}%):</span>
                        <span>${tax}</span>
                      </div>
                      <div className="border-t pt-1 mt-1">
                        <div className="flex justify-between text-lg font-bold text-blue-800">
                          <span>Total:</span>
                          <span>${total}</span>
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
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  type="button"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </ResizableBox>
      </Draggable>
    </div>
  );
};

export default BaseCart;
