import React, { useEffect, useState } from "react";
import { Path, PathValue, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  FormControl,
  Box,
  FormLabel,
  RadioGroup,
  Radio,
  Input,
} from "@mui/joy";
import { useOrderStore } from "../store/useOrderStore";
import { CryptoPrice } from "../hooks/useCryptoPrice";
import BlockchainOrderSelect from "./BlockchainOrderSelect";
import { mockBCListService } from "../services/blockchainService";
import { DirectionEnum, OrderDataType } from "../types/types";
import DirectionRadioGroup from "./DirectionRadioGroup";

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
  } = useForm({
    defaultValues: initialData || {
      cryptocurrency: blockchainList[0].value,
      direction: DirectionEnum.BUY,
      quantity: 0,
      expirationDate: "",
    },
  });
  const [usdValue, setUsdValue] = useState<number>(0);
  const watchQuantity = watch("quantity");
  const watchCryptocurrency = watch("cryptocurrency");
  const { price, isPending } = CryptoPrice(watchCryptocurrency);

  useEffect(() => {
    if (watchCryptocurrency && watchQuantity) {
      if (isPending || price === undefined || price === null) {
        setUsdValue(0);
        return;
      }
      setUsdValue(watchQuantity * price);
    }
  }, [watchQuantity, watchCryptocurrency, isPending, price]);

  const onSubmit = (data: OrderDataType) => {
    console.log(data);
    // if (initialData?.id) {
    //   // Edit existing order
    //   editOrder(initialData.id, { ...data, id: initialData.id });
    // } else {
    //   // Add new order
    //   const newOrder = {
    //     ...data,
    //     id: Math.random(), // Random ID, replace with your logic
    //     usdValue: data.quantity * 50000, // For example, assuming 1 BTC = $50,000
    //   };
    //   addOrder(newOrder);
    // }

    // reset(); // Reset form
    // if (onSubmitSuccess) onSubmitSuccess(); // Optional callback after successful submission
  };

  return (
    <Box component="section" sx={{ marginTop: 5, flex: 1, gap: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.direction && <span>This field is required</span>}
        </FormControl>

        <FormControl>
          <FormLabel id="direction-label">Cryptocurrency</FormLabel>
          <BlockchainOrderSelect
            control={control}
            setValue={setValue}
            initialData={initialData}
            name={"cryptocurrency"}
            options={blockchainList}
          />
          {errors.cryptocurrency && <span>This field is required</span>}
        </FormControl>

        <FormControl>
          <FormLabel id="direction-label">Quantity</FormLabel>
          <Input
            type="number"
            placeholder="Enter quantity"
            size="sm"
            variant="outlined"
            {...register("quantity", { required: true, min: 0.01 })}
          />
          {errors.quantity && <span>This field is required</span>}
        </FormControl>

        <p>{usdValue}</p>

        {/* <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          type="number"
          {...register("quantity", { required: true, min: 0.01 })}
          error={!!errors.quantity}
          helperText={errors.quantity && "Quantity must be greater than 0"}
        /> */}
        {/* 


        <TextField
          fullWidth
          margin="normal"
          label="Expiration Date"
          type="date"
          {...register("expirationDate", { required: true })}
          InputLabelProps={{ shrink: true }}
          error={!!errors.expirationDate}
          helperText={errors.expirationDate && "Expiration date is required"}
        /> */}

        <Button type="submit" variant="contained" color="primary">
          {initialData ? "Edit Order" : "Create Order"}
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;
