import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./types";

// Basic selectors
export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartSubtotal = (state: RootState) => state.cart.subtotal;
export const selectCartTax = (state: RootState) => state.cart.tax;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartTaxRate = (state: RootState) => state.cart.taxRate;
export const selectCartVisibility = (state: RootState) => state.cart.isVisible;
export const selectCartMinimized = (state: RootState) => state.cart.isMinimized;

// Memoized selectors using createSelector
export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

// Get formatted prices
export const selectFormattedSubtotal = createSelector(
  [selectCartSubtotal],
  (subtotal) => subtotal.toFixed(2)
);

export const selectFormattedTax = createSelector([selectCartTax], (tax) =>
  tax.toFixed(2)
);

export const selectFormattedTotal = createSelector([selectCartTotal], (total) =>
  total.toFixed(2)
);

// Find item by ID
export const selectCartItemById = createSelector(
  [selectCartItems, (state: RootState, id: string) => id],
  (items, id) => items.find((item) => item.id === id)
);

// Get cart summary
export const selectCartSummary = createSelector(
  [
    selectCartItems,
    selectCartSubtotal,
    selectCartTax,
    selectCartTotal,
    selectCartItemCount,
  ],
  (items, subtotal, tax, total, itemCount) => ({
    itemCount,
    itemsLength: items.length,
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    isEmpty: items.length === 0,
  })
);
