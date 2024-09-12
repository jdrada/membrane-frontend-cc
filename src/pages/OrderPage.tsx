import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import { useOrderStore } from "../store/useOrderStore";
import { Container, Snackbar, Stack, Typography } from "@mui/joy";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const OrderPage: React.FC = () => {
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [openToast, setOpenToast] = useState(false);
  const orders = useOrderStore((state) => state.orders);
  const orderToEdit = orders.find((order) => order.id === editingOrderId);

  const onSubmitSuccess = () => {
    setEditingOrderId(null);
    setOpenToast(true);
  };

  return (
    <Container maxWidth="md">
      <OrderForm initialData={orderToEdit} onSubmitSuccess={onSubmitSuccess} />
      <OrderList onEdit={(id) => setEditingOrderId(id)} />
      <Snackbar
        open={openToast}
        onClose={() => setOpenToast(false)}
        autoHideDuration={3000}
        color="success"
        size="sm"
        variant="solid"
        invertedColors
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          gap={1}
        >
          <CheckCircleOutlineOutlinedIcon />
          <Typography level="body-md" textAlign={"center"} color="primary">
            Order saved successfully!
          </Typography>
        </Stack>
      </Snackbar>
    </Container>
  );
};

export default OrderPage;
