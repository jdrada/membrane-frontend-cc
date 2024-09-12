import { Snackbar, Stack, Typography } from "@mui/joy";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

type FeedbackSnackProps = {
  openToast: { showToast: boolean; message: string };
  setOpenToast: (value: { showToast: boolean; message: string }) => void;
};

const FeedbackSnack = ({ openToast, setOpenToast }: FeedbackSnackProps) => {
  return (
    <Snackbar
      open={openToast.showToast}
      onClose={() => setOpenToast({ showToast: false, message: "" })}
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
          {openToast.message}
        </Typography>
      </Stack>
    </Snackbar>
  );
};

export default FeedbackSnack;
