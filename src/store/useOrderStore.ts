import { persist } from "zustand/middleware";
import { create } from "zustand";
import { OrderDataType } from "../types/types";

type OrderState = {
  orders: OrderDataType[];
  addOrder: (order: OrderDataType) => void;
  editOrder: (id: string, updatedOrder: OrderDataType) => void;
  deleteOrder: (id: string) => void;
  reset: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
      editOrder: (id, updatedOrder) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? updatedOrder : order
          ),
        })),
      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        })),
      reset: () => set({ orders: [] }),
    }),
    {
      name: "order-storage",
      getStorage: () => localStorage,
    }
  )
);
