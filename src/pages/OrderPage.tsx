import React, { useState } from "react";
import { Container } from "@mui/joy";
import FeedbackSnack from "../components/feedbackSnack/FeedbackSnack";
import OrderForm from "../components/orderForm/OrderForm";
import OrderList from "../components/orderList/OrderList";

const OrderPage: React.FC = () => {
  const [openToast, setOpenToast] = useState({ showToast: false, message: "" });

  const onSubmitSuccess = () => {
    setOpenToast({
      showToast: true,
      message: "Order saved successfully!",
    });
  };

  const onEditSuccess = () => {
    setOpenToast({
      showToast: true,
      message: "Order edited successfully!",
    });
  };

  return (
    <Container maxWidth="md">
      <FeedbackSnack openToast={openToast} setOpenToast={setOpenToast} />
      <OrderForm
        onSubmitSuccess={onSubmitSuccess}
        onEditSuccess={onEditSuccess}
      />
      <OrderList />
    </Container>
  );
};

export default OrderPage;
