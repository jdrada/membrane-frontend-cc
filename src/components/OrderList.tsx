import React, { useState } from "react";
import { useOrderStore } from "../store/useOrderStore";
import Table from "@mui/joy/Table";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import { Box, Button, Card, Drawer, Stack, Typography } from "@mui/joy";
import { formatUSD } from "../utils/currencyUtils";
import { convertISOtoUTC } from "../utils/dateUtils";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import OrderForm from "./OrderForm";
import { OrderDataType } from "../types/types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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
      <Drawer
        open={editOrder.showDrawer}
        onClose={handleCloseEdit}
        anchor="right"
        color="primary"
        invertedColors={false}
        size="lg"
        variant="plain"
      >
        <Box
          sx={{
            width: "full",
            height: "100%",
            px: 2,
            py: 6,
            position: "relative",
          }}
        >
          <Button
            color="neutral"
            variant="plain"
            size="sm"
            onClick={handleCloseEdit}
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              margin: 2,
              zIndex: 100,
            }}
          >
            <CloseOutlinedIcon />
          </Button>
          <OrderForm initialData={editOrder.order} />
        </Box>
      </Drawer>
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

const TH = ({ children }: { children: React.ReactNode }) => {
  return (
    <th>
      <Typography
        level="body-sm"
        sx={{
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        {children}
      </Typography>
    </th>
  );
};

const TD = ({
  children,
  text,
}: {
  children?: React.ReactNode;
  text?: string | number;
}) => {
  return (
    <td>
      <Typography
        level="body-sm"
        sx={{
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
      {children}
    </td>
  );
};
