import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { convertISOtoUTC } from "../utils/dateUtils";

export default function UTCTimeDisplay({
  expirationDate,
}: {
  expirationDate: string | undefined;
}) {
  console.log(expirationDate);
  return (
    <Card
      size="sm"
      variant="soft"
      color="neutral"
      invertedColors
      sx={{
        mt: 2,
        justifyContent: "space-between",
        flexDirection: "row",
        minWidth: "30%",
        height: "100%",
      }}
    >
      <CardContent orientation="horizontal">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography level="body-xs">Your order will expire on:</Typography>
          {expirationDate ? (
            <Typography
              level="body-sm"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              {convertISOtoUTC(expirationDate)}
            </Typography>
          ) : (
            <Typography level="body-xs">--</Typography>
          )}
        </CardContent>
      </CardContent>
    </Card>
  );
}
