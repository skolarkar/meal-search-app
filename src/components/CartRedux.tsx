import React from "react";
import BaseCart from "./BaseCart";

// Redux imports
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeFromCart, toggleCartMinimized } from "../store/cartSlice";
import {
  selectCartItems,
  selectCartMinimized,
  selectFormattedSubtotal,
  selectFormattedTax,
  selectFormattedTotal,
  selectCartTaxRate,
} from "../store/selectors";

const CartRedux: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux selectors
  const cartItems = useAppSelector(selectCartItems);
  const isMinimized = useAppSelector(selectCartMinimized);
  const subtotal = useAppSelector(selectFormattedSubtotal);
  const tax = useAppSelector(selectFormattedTax);
  const total = useAppSelector(selectFormattedTotal);
  const taxRate = useAppSelector(selectCartTaxRate);

  // Handle minimize/maximize
  const handleMinimizeToggle = (): void => {
    dispatch(toggleCartMinimized());
  };

  // Handle remove item
  const handleRemoveFromCart = (index: number): void => {
    dispatch(removeFromCart(index));
  };

  return (
    <BaseCart
      items={cartItems}
      isMinimized={isMinimized}
      onMinimizeToggle={handleMinimizeToggle}
      onRemoveFromCart={handleRemoveFromCart}
      subtotal={subtotal}
      tax={tax}
      total={total}
      taxRate={taxRate * 100} // Convert to percentage
    />
  );
};

export default CartRedux;
