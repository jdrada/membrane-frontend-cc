import { useOrderStore } from "../store/useOrderStore";
import { OrderDataType } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const useOrders = () => {
  const orders = useOrderStore((state) => state.orders);
  const addOrder = useOrderStore((state) => state.addOrder);
  const editOrder = useOrderStore((state) => state.editOrder);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);
  const resetOrders = useOrderStore((state) => state.reset);

  const createOrder = (newOrder: OrderDataType) => {
    addOrder({ ...newOrder, id: uuidv4() });
  };

  const updateOrder = (id: string, updatedOrder: OrderDataType) => {
    editOrder(id, { ...updatedOrder, id: updatedOrder.id });
  };

  const removeOrder = (id: string) => {
    deleteOrder(id);
  };

  return {
    orders,
    createOrder,
    updateOrder,
    removeOrder,
    resetOrders,
  };
};
