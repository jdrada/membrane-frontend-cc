/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
  const [displayedUSD, setDisplayedUSD] = useState<number>(0);
  const watchQuantity = watch("quantity");
  const watchCryptocurrency = watch("cryptocurrency");
  const { price, isPending } = CryptoPrice(watchCryptocurrency);

  useEffect(() => {
    if (watchCryptocurrency && watchQuantity) {
      if (isPending || price === undefined || price === null) {
        setValue("usdValue", 0);
        setDisplayedUSD(0);
        return;
      }
      setValue("usdValue", watchQuantity * price);
      setDisplayedUSD(watchQuantity * price);
    }
  }, [watchQuantity, watchCryptocurrency, isPending, price]);

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
    if (onSubmitSuccess) onSubmitSuccess(); // Optional callback after successful submission
  };

  const setAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) return;
    setDisplayedUSD(Number(e.target.value));
    setValue("quantity", Number(e.target.value));
  };

  return (
    <Box
      invertedColors
      color="primary"
      component={Card}
      size="lg"
      sx={{ margin: "0 auto" }}
    >
      <Box>
        <Typography level="h1" sx={{ fontSize: "xl" }}>
          Create OTC Order
        </Typography>
        <Typography level="body-sm">
          Fill out the form to create a new OTC order
        </Typography>
      </Box>

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

        <Stack sx={{ width: "full" }} spacing={2}>
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
              <InfoText>
                Select the cryptocurrency you want to buy/sell
              </InfoText>
            )}
          </FormControl>

          <FormControl>
            <Stack direction={"row"} gap={2}>
              <Box width={"100%"}>
                <FormLabel id="direction-label" sx={{ fontWeight: "bold" }}>
                  Quantity
                </FormLabel>
                <Input
                  sx={{ width: "100%" }}
                  title="quantity"
                  color={errors.quantity ? "danger" : "neutral"}
                  placeholder="Enter quantity"
                  onChange={(e) => {
                    setAmountHandler(e);
                  }}
                />
                {errors.quantity ? (
                  <ErrorText>Quantity must be greater than 0</ErrorText>
                ) : (
                  <InfoText>
                    Enter the quantity of cryptocurrency you want to buy/sell
                  </InfoText>
                )}
              </Box>
              <USDCostDisplay
                value={displayedUSD}
                watchQuantity={watchQuantity}
                watchCryptocurrency={watchCryptocurrency}
                price={price}
              />
            </Stack>
          </FormControl>

          <FormControl>
            <Stack direction={"row"} gap={2}>
              <Box width={"100%"}>
                <FormLabel id="time-label">Expiration Date</FormLabel>
                <Input
                  type="datetime-local"
                  size="sm"
                  {...register("expirationDate", { required: true })}
                />
                {errors.expirationDate ? (
                  <ErrorText>Expiration date is required</ErrorText>
                ) : (
                  <InfoText>Enter the expiration date for the order</InfoText>
                )}
              </Box>
              <USDCostDisplay
                value={displayedUSD}
                watchQuantity={watchQuantity}
                watchCryptocurrency={watchCryptocurrency}
                price={price}
              />
            </Stack>
          </FormControl>
        </Stack>

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
