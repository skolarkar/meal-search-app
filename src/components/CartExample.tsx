import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  setTaxRate,
} from "../store/cartSlice";
import {
  selectCartItems,
  selectCartSummary,
  selectCartItemCount,
} from "../store/selectors";

const CartExample: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartSummary = useAppSelector(selectCartSummary);
  const itemCount = useAppSelector(selectCartItemCount);

  // Example handlers
  const handleAddItem = () => {
    dispatch(
      addToCart({
        description: "Sample Meal",
        price: "$12.99",
        imageUrl: "sample.jpg",
      })
    );
  };

  const handleRemoveItem = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleChangeTaxRate = () => {
    // Change tax rate to 8%
    dispatch(setTaxRate(0.08));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Redux Cart Example</h2>

      {/* Cart Summary */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
        <p>Items: {itemCount}</p>
        <p>Subtotal: ${cartSummary.subtotal}</p>
        <p>Tax: ${cartSummary.tax}</p>
        <p>Total: ${cartSummary.total}</p>
      </div>

      {/* Actions */}
      <div className="space-x-2 mb-4">
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Sample Item
        </button>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
        <button
          onClick={handleChangeTaxRate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Change Tax to 8%
        </button>
      </div>

      {/* Cart Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li
                key={item.id}
                className="bg-white p-3 rounded shadow flex justify-between items-center"
              >
                <div>
                  <span className="font-medium">{item.description}</span>
                  <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  <span className="text-blue-600 ml-2">{item.price}</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="bg-red-200 px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartExample;
