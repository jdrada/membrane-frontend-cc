import create from "zustand";

type Order = {
  id: number;
  direction: "buy" | "sell";
  cryptocurrency: string;
  quantity: number;
  usdValue: number;
  expirationDate: string; // UTC
};

type OrderState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  editOrder: (id: number, updatedOrder: Order) => void;
  deleteOrder: (id: number) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  editOrder: (id, updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...updatedOrder } : order
      ),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
}));
