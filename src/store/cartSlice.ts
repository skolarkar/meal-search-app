import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./types";

// Helper function to generate unique ID
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Helper function to calculate price
const parsePrice = (price: string): number => {
  return parseFloat(String(price).replace("$", "")) || 0;
};

// Helper functions for calculations
const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = parsePrice(item.price);
    return total + price * item.quantity;
  }, 0);
};

const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * taxRate;
};

const calculateTotal = (subtotal: number, tax: number): number => {
  return subtotal + tax;
};

// Initial state
const initialState: CartState = {
  items: [],
  isVisible: true,
  isMinimized: false,
  subtotal: 0,
  tax: 0,
  total: 0,
  taxRate: 0.05, // 5% tax
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "id" | "quantity">>
    ) => {
      const newItem = {
        ...action.payload,
        id: generateId(),
        quantity: 1,
      };

      // Check if item already exists (by description)
      const existingItemIndex = state.items.findIndex(
        (item) => item.description === newItem.description
      );

      if (existingItemIndex >= 0) {
        // If item exists, increase quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If new item, add to cart
        state.items.push(newItem);
      }

      // Recalculate totals
      state.subtotal = calculateSubtotal(state.items);
      state.tax = calculateTax(state.subtotal, state.taxRate);
      state.total = calculateTotal(state.subtotal, state.tax);
    },

    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items.splice(index, 1);

        // Recalculate totals
        state.subtotal = calculateSubtotal(state.items);
        state.tax = calculateTax(state.subtotal, state.taxRate);
        state.total = calculateTotal(state.subtotal, state.tax);
      }
    },

    // Remove item by ID
    removeFromCartById: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate totals
      state.subtotal = calculateSubtotal(state.items);
      state.tax = calculateTax(state.subtotal, state.taxRate);
      state.total = calculateTotal(state.subtotal, state.tax);
    },

    // Update item quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity <= 0) {
        // Remove item if quantity is 0 or less
        state.items = state.items.filter((item) => item.id !== id);
      }

      // Recalculate totals
      state.subtotal = calculateSubtotal(state.items);
      state.tax = calculateTax(state.subtotal, state.taxRate);
      state.total = calculateTotal(state.subtotal, state.tax);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
    },

    // Toggle cart visibility
    toggleCartVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },

    // Set cart visibility
    setCartVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },

    // Toggle cart minimized state
    toggleCartMinimized: (state) => {
      state.isMinimized = !state.isMinimized;
    },

    // Set cart minimized state
    setCartMinimized: (state, action: PayloadAction<boolean>) => {
      state.isMinimized = action.payload;
    },

    // Update tax rate
    setTaxRate: (state, action: PayloadAction<number>) => {
      state.taxRate = action.payload;

      // Recalculate totals with new tax rate
      state.tax = calculateTax(state.subtotal, state.taxRate);
      state.total = calculateTotal(state.subtotal, state.tax);
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  removeFromCartById,
  updateQuantity,
  clearCart,
  toggleCartVisibility,
  setCartVisibility,
  toggleCartMinimized,
  setCartMinimized,
  setTaxRate,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
