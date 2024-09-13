import React, { useState } from "react";
import { Container } from "@mui/joy";
import FeedbackSnack from "../components/feedbackSnack/FeedbackSnack";
import OrderForm from "../components/orderForm/OrderForm";
import OrderList from "../components/orderList/OrderList";

const OrderPage: React.FC = () => {
  const [openToast, setOpenToast] = useState({ showToast: false, message: "" });

  const handleOnSubmitSuccess = () => {
    setOpenToast({
      showToast: true,
      message: "Order saved successfully!",
    });
  };

  return (
    <Container maxWidth="md">
      <FeedbackSnack openToast={openToast} setOpenToast={setOpenToast} />
      <OrderForm onSubmitSuccess={handleOnSubmitSuccess} />
      <OrderList />
    </Container>
  );
};

export default OrderPage;
