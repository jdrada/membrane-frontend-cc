import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  Box,
  FormLabel,
  Input,
  Typography,
  Stack,
  Card,
} from "@mui/joy";
import { CryptoPrice } from "../hooks/useCryptoPrice";
import { DirectionEnum, OrderDataType } from "../types/types";
import DirectionRadioGroup from "./OrderForm/DirectionRadioGroup";
import USDCostDisplay from "./OrderForm/USDCostDisplay";
import UTCTimeDisplay from "./OrderForm/UTCTimeDisplay";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { ErrorText, InfoText } from "./OrderForm/FormTextHelpers";
import BlockchainOrderSelect from "./OrderForm/BlockchainOrderSelect";
import { useOrders } from "../hooks/useOrders";
import { useGetBlockchains } from "../hooks/useGetBlockchains";

type OrderFormProps = {
  initialData?: OrderDataType | null;
  onSubmitSuccess?: () => void;
  onEditSuccess?: () => void;
};

const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
  onSubmitSuccess,
  onEditSuccess,
}) => {
  const { blockchains: blockchainList } = useGetBlockchains();
  console.log(blockchainList);

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: initialData || {
      cryptocurrency: blockchainList[0].name,
      direction: DirectionEnum.BUY,
      quantity: 0,
      expirationDate: "",
      usdValue: 0,
    },
  });
  const { createOrder, updateOrder } = useOrders();
  const watchDirection = watch("direction");
  const watchQuantity = watch("quantity");
  const watchExpirationDate = watch("expirationDate");
  const watchCryptocurrency = watch("cryptocurrency");
  const watchUSDValue = watch("usdValue");
  const { price } = CryptoPrice(watchCryptocurrency);
  const displayPrice = price ?? 0;

  useEffect(() => {
    setValue("usdValue", (watchQuantity ?? 0) * displayPrice);
  }, [watchQuantity, setValue, displayPrice]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: OrderDataType) => {
    if (initialData?.id) {
      updateOrder(initialData.id, data);
      onEditSuccess?.();
    } else {
      createOrder(data);
      reset();
      onSubmitSuccess?.();
    }
  };

  return (
    <Box
      color="primary"
      sx={{
        margin: "auto auto",
        width: "full",
        p: 2,
        mt: { base: 1, md: 2 },
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ pb: 2 }}>
          <Typography level="h1" sx={{ fontSize: "xl" }}>
            {initialData ? "Edit OTC Order" : "Create OTC Order"}
          </Typography>
          <Typography level="body-sm">
            {/* Fill out the form to create a new OTC order */}
            {initialData
              ? "Edit the form to update the OTC order"
              : "Fill out the form to create a new OTC order"}
          </Typography>
        </Box>
        <Stack
          invertedColors
          variant="soft"
          color="primary"
          component={Card}
          direction={"row"}
          gap={1}
          sx={{
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography level="body-md">
            {watchDirection === DirectionEnum.BUY ? "Buy" : "Sell"}
          </Typography>
          {watchDirection === DirectionEnum.BUY ? (
            <ShoppingCartOutlinedIcon fontSize="small" />
          ) : (
            <SellOutlinedIcon fontSize="small" />
          )}
        </Stack>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)} className="otc-form">
        <FormControl>
          <FormLabel id="direction-label" sx={{ fontWeight: "bold" }}>
            Direction
          </FormLabel>
          <DirectionRadioGroup
            initialData={undefined}
            name={"cryptocurrency"}
            options={[
              { direction: DirectionEnum.BUY },
              { direction: DirectionEnum.SELL },
            ]}
            setValue={setValue}
          />
          {errors.direction && <ErrorText>This field is required</ErrorText>}
        </FormControl>
        <FormControl>
          <FormLabel id="direction-label" sx={{ fontWeight: "bold" }}>
            Cryptocurrency
          </FormLabel>
          <BlockchainOrderSelect
            control={control}
            setValue={setValue}
            initialData={initialData || undefined}
            name={"cryptocurrency"}
            options={blockchainList}
          />
          {errors.cryptocurrency ? (
            <ErrorText>This field is required</ErrorText>
          ) : (
            <InfoText>Select the cryptocurrency you want to buy/sell</InfoText>
          )}
        </FormControl>
        <FormControl>
          <Stack direction={{ base: "column", md: "row" }} gap={2}>
            <Box width={"100%"}>
              <FormLabel id="direction-label" sx={{ fontWeight: "bold" }}>
                Quantity
              </FormLabel>
              <Input
                sx={{ width: "100%" }}
                title="quantity"
                color={errors.quantity ? "danger" : "neutral"}
                {...register("quantity", {
                  required: true,
                  min: 0.00001,
                  valueAsNumber: true,
                  validate: {
                    positive: (v) => {
                      return v ? v > 0 : false;
                    },
                  },
                })}
              />
              {errors.quantity ? (
                <ErrorText>
                  {errors.quantity?.type === "required" &&
                    "Quantity is required"}
                  {errors.quantity?.type === "positive" &&
                    "Quantity must be positive"}
                  {errors.quantity?.type === "min" &&
                    "Minimum quantity is 0.00001"}
                </ErrorText>
              ) : (
                <InfoText>
                  Enter the quantity of cryptocurrency you want to buy/sell
                </InfoText>
              )}
            </Box>
            <USDCostDisplay
              watchValue={watchUSDValue}
              watchQuantity={watchQuantity}
              watchCryptocurrency={watchCryptocurrency}
              price={displayPrice}
            />
          </Stack>
        </FormControl>
        <FormControl>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={{ base: 0, md: 2 }}
          >
            <Box width={"100%"}>
              <FormLabel id="time-label">Expiration Date</FormLabel>
              <Input
                color={errors.expirationDate ? "danger" : "neutral"}
                type="datetime-local"
                {...register("expirationDate", {
                  required: true,
                  validate: {
                    futureDate: (v) => {
                      return v ? new Date(v) > new Date() : false;
                    },
                  },
                })}
              />
              {errors.expirationDate ? (
                <ErrorText>
                  {errors.expirationDate?.type === "required"
                    ? "Expiration date is required"
                    : errors.expirationDate?.type === "futureDate"
                      ? "You are not Marty McFly, please select a future date"
                      : ""}
                </ErrorText>
              ) : (
                <InfoText>Enter the expiration date for the order</InfoText>
              )}
            </Box>
            <UTCTimeDisplay expirationDate={watchExpirationDate} />
          </Stack>
        </FormControl>
        <Button
          type="submit"
          color="neutral"
          sx={{ mt: 4, background: "black" }}
          aria-label={initialData ? "Edit Order" : "Create Order"}
        >
          {initialData ? "Edit Order" : "Create Order"}
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;
