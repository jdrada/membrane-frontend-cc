import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import { useOrderStore } from "../store/useOrderStore";
import { Container, Typography } from "@mui/joy";

const OrderPage: React.FC = () => {
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const orders = useOrderStore((state) => state.orders);
  const orderToEdit = orders.find((order) => order.id === editingOrderId);

  return (
    <Container maxWidth="md">
      <OrderForm
        initialData={orderToEdit}
        onSubmitSuccess={() => setEditingOrderId(null)}
      />
      <OrderList onEdit={(id) => setEditingOrderId(id)} />
    </Container>
  );
};

export default OrderPage;
