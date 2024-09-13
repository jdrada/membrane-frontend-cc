import { Box, Button, Drawer } from "@mui/joy";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OrderForm from "../orderForm/OrderForm";
import { OrderDataType } from "../../types/types";

const EditDrawer = ({
  handleCloseEdit,
  editOrder,
}: {
  handleCloseEdit: () => void;
  editOrder: { showDrawer: boolean; order: OrderDataType | null | undefined };
}) => {
  return (
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
  );
};

export default EditDrawer;
