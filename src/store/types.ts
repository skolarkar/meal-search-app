// Redux store types
export interface CartItem {
  id: string;
  description: string;
  price: string;
  quantity: number;
  imageUrl?: string;
}

export interface CartState {
  items: CartItem[];
  isVisible: boolean;
  isMinimized: boolean;
  subtotal: number;
  tax: number;
  total: number;
  taxRate: number; // e.g., 0.05 for 5%
}

export interface RootState {
  cart: CartState;
}
