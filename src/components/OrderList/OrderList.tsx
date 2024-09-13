import React, { useState } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import Table from "@mui/joy/Table";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { Box, Button, Card, Stack, Typography } from "@mui/joy";
import { formatUSD } from "../../utils/currencyUtils";
import { convertISOtoUTC } from "../../utils/dateUtils";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { OrderDataType } from "../../types/types";

import EditDrawer from "./EditDrawer";
import { TD, TH } from "./TableStuff";

const OrderList: React.FC = () => {
  const [editOrder, setEditOrder] = useState<{
    showDrawer: boolean;
    order: OrderDataType | null | undefined;
  }>({
    showDrawer: false,
    order: null,
  });
  const orders = useOrderStore((state) => state.orders);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  const handleEditOrder = (orderId: string) => {
    const order = orders.find((order) => order.id === orderId);
    setEditOrder({ showDrawer: true, order });
  };

  const handleCloseEdit = () => {
    setEditOrder({ showDrawer: false, order: null });
  };

  return (
    <>
      <EditDrawer handleCloseEdit={handleCloseEdit} editOrder={editOrder} />
      <Box
        color="primary"
        component={Card}
        size="lg"
        sx={{ margin: "0 auto", mt: 4, overflowX: "auto" }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography level="h1" sx={{ fontSize: "xl" }}>
              Order List
            </Typography>
          </Box>
        </Stack>
        <Table
          borderAxis="xBetween"
          color="neutral"
          stickyFooter={false}
          stickyHeader
          sx={{
            // overflowX: "hidden",

            "& thead th:nth-of-type(1)": { width: 60 },
            "& thead th:nth-of-type(2)": {
              width: 100,
              textAlign: "center",
            },
            "& thead th:nth-of-type(3)": { width: 40 },
            "& thead th:nth-of-type(4)": { width: 160 },
            "& thead th:nth-of-type(5)": { width: 200 },
            "& thead th:nth-of-type(6)": {
              width: 80,
              textAlign: "center",
              textWrap: "nowrap",
            },
            "& thead th:nth-of-type(7)": { width: 80 },
          }}
        >
          <thead>
            <tr>
              <TH>Direction</TH>
              <TH>Cryptocurrency</TH>
              <TH>Qty</TH>
              <TH>USD Equivalent</TH>
              <TH>Expiration Date (UTC)</TH>
              <TH>Actions</TH>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <TD text={order.direction} />
                <TD text={capitalizeFirstLetter(order.cryptocurrency)} />
                <TD text={order.quantity} />
                <TD text={formatUSD(order.usdValue)} />
                <TD text={convertISOtoUTC(order.expirationDate, true)} />
                <TD>
                  <Stack direction="row" gap={1}>
                    <Button
                      color="neutral"
                      variant="plain"
                      size="sm"
                      // onClick={() => onEdit(order.id as string)}
                      onClick={() => handleEditOrder(order.id as string)}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="plain"
                      onClick={() => deleteOrder(order.id as string)}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </Button>
                  </Stack>
                </TD>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
};

export default OrderList;
