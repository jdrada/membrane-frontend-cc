/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select, Option } from "@mui/joy";
import { Controller } from "react-hook-form";
import { CustomMUISelectProps, OrderDataType } from "../../types/types";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

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
            /* This is a dirty workaround since MUI/joy <Select/> onChange prop returns a React.MouseEvent (Bug??) 
            A more elegant solution is possible but for times reason and because is not part of the challenge, 
            I'll overwrite the prop just for fun ;) -Juan */
            onChange={(event) => {
              setValue(
                "cryptocurrency",
                (event?.target as HTMLInputElement).id as string
              );
            }}
            {...field}
          >
            {options.map((option) => (
              <Option
                key={option.id}
                id={option.name}
                value={option.name}
                aria-label={option.name}
              >
                {capitalizeFirstLetter(option.name)}
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
