import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { formatUSD } from "../utils/currencyUtils";
import { capitalizeFirstLetter } from "../utils/stringUtils";

export default function USDCostDisplay({
  value,
  watchQuantity,
  watchCryptocurrency,
  price,
}: {
  value: number;
  watchQuantity: number | undefined;
  watchCryptocurrency: string | undefined;
  price: number | undefined | null;
}) {
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
          <Typography level="h3" sx={{}}>
            {formatUSD(value)}
          </Typography>
          <Typography level="body-xs">
            {watchQuantity || 0} {capitalizeFirstLetter(watchCryptocurrency)} @{" "}
            {formatUSD(price || 0)} USD
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
}
