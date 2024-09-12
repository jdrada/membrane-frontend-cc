/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select, Option } from "@mui/joy";
import { Controller } from "react-hook-form";
import { CustomMUISelectProps, OrderDataType } from "../types/types";
import { capitalizeFirstLetter } from "../utils/helpers";

const BlockchainOrderSelect = ({
  control,
  setValue,
  initialData,
  name,
  options,
}: CustomMUISelectProps<OrderDataType>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, ...field } }) => (
          <Select
            /* This is a dirty workaround since MUI/joy <Select/> onChange prop returns a React.MouseEvent (Bug??), a more elegant solution is possible but for times reason and because is not part of the challenge, I'll overwrite the prop just for fun ;) */
            onChange={(event) => {
              setValue(
                "cryptocurrency",
                (event?.target as HTMLInputElement).id as string
              );
            }}
            size="sm"
            {...field}
          >
            {options.map((option) => (
              <Option
                key={option.id}
                id={option.value}
                value={option.value}
                aria-label={option.value}
              >
                {capitalizeFirstLetter(option.value)}
              </Option>
            ))}
          </Select>
        )}
        defaultValue={initialData?.cryptocurrency || "bitcoin"}
      />
    </>
  );
};

export default BlockchainOrderSelect;
