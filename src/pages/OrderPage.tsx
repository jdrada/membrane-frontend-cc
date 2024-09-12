import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import { useOrderStore } from "../store/useOrderStore";
import { Container, Typography } from "@mui/joy";

const OrderPage: React.FC = () => {
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const orders = useOrderStore((state) => state.orders);
  const orderToEdit = orders.find((order) => order.id === editingOrderId);

  return (
    <Container maxWidth="md">
      <Typography level="h1" sx={{ fontSize: "xl", mb: 0.5 }}>
        Create OTC Order
      </Typography>
      <Typography level="body-sm">
        Fill out the form to create a new OTC order
      </Typography>
      <OrderForm
        initialData={orderToEdit}
        onSubmitSuccess={() => setEditingOrderId(null)}
      />
      <OrderList onEdit={(id) => setEditingOrderId(id)} />
    </Container>
  );
};

export default OrderPage;
