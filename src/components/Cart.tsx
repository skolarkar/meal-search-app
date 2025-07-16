import React, { useState } from "react";
import BaseCart from "./BaseCart";

// Type definitions
interface CartItem {
  description: string;
  price: string;
}

interface CartProps {
  cart: CartItem[];
  onRemoveFromCart: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveFromCart }) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Calculate subtotal (without taxes)
  const calculateSubtotal = (): number => {
    return cart.reduce((total: number, item: CartItem) => {
      const price: number =
        parseFloat(String(item.price).replace("$", "")) || 0;
      return total + price;
    }, 0);
  };

  // Calculate tax amount
  const calculateTax = (): number => {
    const subtotal: number = calculateSubtotal();
    return (subtotal * 5) / 100; // 5% tax
  };

  // Calculate total = subtotal+tax
  const calculateTotal = (): string => {
    const subtotal: number = calculateSubtotal();
    return (subtotal + calculateTax()).toFixed(2);
  };

  // Handle minimize/maximize button click
  const handleMinimizeToggle = (): void => {
    setIsMinimized(!isMinimized);
  };

  return (
    <BaseCart
      items={cart}
      isMinimized={isMinimized}
      onMinimizeToggle={handleMinimizeToggle}
      onRemoveFromCart={onRemoveFromCart}
      subtotal={calculateSubtotal().toFixed(2)}
      tax={calculateTax().toFixed(2)}
      total={calculateTotal()}
      taxRate={5}
    />
  );
};

export default Cart;
