/* eslint-disable react-hooks/exhaustive-deps */
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
import { useOrderStore } from "../store/useOrderStore";
import { CryptoPrice } from "../hooks/useCryptoPrice";
import BlockchainOrderSelect from "./BlockchainOrderSelect";
import { mockBCListService } from "../services/blockchainService";
import { DirectionEnum, OrderDataType } from "../types/types";
import DirectionRadioGroup from "./DirectionRadioGroup";
import { v4 as uuidv4 } from "uuid";
import USDCostDisplay from "./USDCostDisplay";
import UTCTimeDisplay from "./UTCTimeDisplay";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

type OrderFormProps = {
  initialData?: OrderDataType;
  onSubmitSuccess?: () => void;
};

const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
  onSubmitSuccess,
}) => {
  const blockchainList = mockBCListService();
  const addOrder = useOrderStore((state) => state.addOrder);
  const editOrder = useOrderStore((state) => state.editOrder);

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
      cryptocurrency: blockchainList[0].value,
      direction: DirectionEnum.BUY,
      quantity: 0,
      expirationDate: "",
      usdValue: 0,
    },
  });
  const watchDirection = watch("direction");
  const watchQuantity = watch("quantity");
  const watchExpirationDate = watch("expirationDate");
  const watchCryptocurrency = watch("cryptocurrency");
  const watchUSDValue = watch("usdValue");
  const { price } = CryptoPrice(watchCryptocurrency);

  useEffect(() => {
    const calculateUSDValue = (qty: number, price: number) => {
      return qty * price;
    };
    const value = calculateUSDValue(watchQuantity ?? 0, price ?? 0);
    setValue("usdValue", value);
  }, [watchQuantity, watchCryptocurrency, price]);

  const onSubmit = (data: OrderDataType) => {
    if (initialData?.id) {
      editOrder(initialData.id, { ...data, id: initialData.id });
    } else {
      const newOrder = {
        ...data,
        id: uuidv4(),
      };
      addOrder(newOrder);
    }

    reset();
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <Box color="primary" component={Card} size="lg" sx={{ margin: "0 auto" }}>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography level="h1" sx={{ fontSize: "xl" }}>
            Create OTC Order
          </Typography>
          <Typography level="body-sm">
            Fill out the form to create a new OTC order
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
            initialData={initialData}
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
                  Quantity must be a number greater than 0.00001
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
              price={price}
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
                {...register("expirationDate", { required: true })}
              />
              {errors.expirationDate ? (
                <ErrorText>Expiration date is required</ErrorText>
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
        >
          {initialData ? "Edit Order" : "Create Order"}
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;

const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <Typography color="danger" fontSize={12} sx={{ mt: 0.5 }}>
    {children}
  </Typography>
);

const InfoText = ({ children }: { children: React.ReactNode }) => (
  <Typography color="neutral" fontSize={12} sx={{ mt: 0.5 }}>
    {children}
  </Typography>
);
