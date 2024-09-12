import { Radio, RadioGroup } from "@mui/joy";
import {
  CustomMUIRadioGroupProps,
  DirectionEnum,
  OrderDataType,
} from "../types/types";
import { capitalizeFirstLetter } from "../utils/stringUtils";

const DirectionRadioGroup = ({
  initialData,
  options,
  setValue,
}: CustomMUIRadioGroupProps<OrderDataType>) => {
  return (
    <RadioGroup
      color="neutral"
      id="direction"
      aria-labelledby="direction-label"
      defaultValue={initialData?.direction || DirectionEnum.BUY}
      orientation="horizontal"
      onChange={(event) => {
        setValue(
          "direction",
          event?.target.value as OrderDataType["direction"]
        );
      }}
    >
      {options.map((option) => (
        <Radio
          color="neutral"
          key={option.direction}
          value={option.direction}
          label={capitalizeFirstLetter(option.direction)}
        />
      ))}
    </RadioGroup>
  );
};

export default DirectionRadioGroup;
