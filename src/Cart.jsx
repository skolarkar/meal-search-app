import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import styles for react-resizable

function Cart({ cart, calculateTotal }) {
  const nodeRef = useRef(null); // Create a ref for the draggable container

  return (
    <Draggable nodeRef={nodeRef}>
      <ResizableBox
        width={320} // Initial width
        height={200} // Initial height
        minConstraints={[200, 150]} // Minimum width and height
        maxConstraints={[600, 400]} // Maximum width and height
        resizeHandles={['se','sw','ne','nw','w','e','s' ]} // Resize handle at the bottom-right corner
      >
        <div
          ref={nodeRef} // Attach the ref to the draggable container
          className="w-full h-full bg-blue-100 shadow-lg rounded-lg flex flex-col border border-yellow-200 cursor-move"
        >
          {/* Fixed Heading */}
          <div className="p-4 border-b bg-blue-100 rounded-t-lg">
            <h2 className="text-xl font-bold text-blue-700">Your Cart</h2>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 text-sm text-blue-700">
            {cart.length === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty.</p>
            ) : (
              <div>
                <ul className="mb-4 space-y-2">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span className="font-medium">{item.description}</span>
                      <span className="text-blue-600 font-semibold">{item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-2 mt-2">
                  <p className="text-lg font-bold text-blue-800">
                    Total: ${calculateTotal()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Button */}
          <div className="p-4 bg-blue-100 rounded-b-lg">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Checkout
            </button>
          </div>
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default Cart;