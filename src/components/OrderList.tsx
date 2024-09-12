import React from "react";
import { useOrderStore } from "../store/useOrderStore";
import Table from "@mui/joy/Table";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import { Box, Button, Card, Stack, Typography } from "@mui/joy";
import { formatUSD } from "../utils/currencyUtils";
import { convertISOtoUTC } from "../utils/dateUtils";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

          "& thead th:nth-of-type(1)": { width: 20 },
          "& thead th:nth-of-type(2)": {
            width: 60,
            textAlign: "center",
          },
          "& thead th:nth-of-type(3)": { width: 100 },
          "& thead th:nth-of-type(4)": { width: 40 },
          "& thead th:nth-of-type(5)": { width: 160 },
          "& thead th:nth-of-type(6)": {
            width: 200,
            textAlign: "center",
            textWrap: "nowrap",
          },
          "& thead th:nth-of-type(7)": { width: 80 },
        }}
      >
        <thead>
          <tr>
            <TH>ID</TH>
            <TH>Direction</TH>
            <TH>Cryptocurrency</TH>
            <TH>Qty</TH>
            <TH>USD Value</TH>
            <TH>Expiration Date</TH>
            <TH>Actions</TH>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={order.id}>
              <TD text={i + 1} />
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
                    onClick={() => onEdit(order.id as string)}
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
