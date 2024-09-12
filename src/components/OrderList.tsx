import React from "react";
import { useOrderStore } from "../store/useOrderStore";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderList: React.FC<{ onEdit: (id: number) => void }> = ({ onEdit }) => {
  const orders = useOrderStore((state) => state.orders);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  return (
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
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.direction}</TableCell>
            <TableCell>{order.cryptocurrency}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{order.usdValue}</TableCell>
            <TableCell>{order.expirationDate}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(order.id)}>Edit</Button>
              <Button onClick={() => deleteOrder(order.id)} color="error">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;
