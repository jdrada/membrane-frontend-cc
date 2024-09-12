import React from "react";
import { useOrderStore } from "../store/useOrderStore";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { substring } from "../utils/stringUtils";
import { Card } from "@mui/joy";

const OrderList: React.FC<{ onEdit: (id: string) => void }> = ({ onEdit }) => {
  const orders = useOrderStore((state) => state.orders);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <Box
      color="primary"
      component={Card}
      size="lg"
      sx={{ margin: "0 auto", mt: 4 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Cryptocurrency</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>USD Value</TableCell>
            <TableCell>Expiration Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {substring(order.id as string, 0, 10) + "..."}
              </TableCell>
              <TableCell>{order.direction}</TableCell>
              <TableCell>{order.cryptocurrency}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.usdValue}</TableCell>
              <TableCell>{order.expirationDate}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(order.id as string)}>Edit</Button>
                <Button
                  onClick={() => deleteOrder(order.id as string)}
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrderList;
