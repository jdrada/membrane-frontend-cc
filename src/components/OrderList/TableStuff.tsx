import { Box, Typography } from "@mui/joy";

export const TH = ({ children }: { children: React.ReactNode }) => {
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

export const TD = ({
  children,
  text,
}: {
  children?: React.ReactNode;
  text?: string | number;
}) => {
  return (
    <td>
      <Box
        sx={{
          width: "100%",
          height: "100%",

          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          level="body-sm"
          sx={{
            textAlign: "center",
          }}
        >
          {text}
        </Typography>
        {children}
      </Box>
    </td>
  );
};
