import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { formatUSD } from "../../utils/currencyUtils";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

export default function USDCostDisplay({
  watchValue,
  watchCryptocurrency,
  price,
}: {
  watchValue: number | undefined;
  watchQuantity: number | undefined;
  watchCryptocurrency: string | undefined;
  price: number | undefined | null;
}) {
  const value = watchValue ?? 0;
  const cryptocurrency = watchCryptocurrency ?? "";
  return (
    <Card
      size="sm"
      variant="soft"
      color={value >= 0 ? "neutral" : "danger"}
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
          <Typography level="h3" sx={{}}>
            {value >= 0 ? formatUSD(value) : "Enter Quantity"}
          </Typography>
          {
            <Typography level="body-xs">
              {capitalizeFirstLetter(cryptocurrency)} @ {formatUSD(price || 0)}{" "}
              USD
            </Typography>
          }
        </CardContent>
      </CardContent>
    </Card>
  );
}
