import { FieldValues, Control, UseFormSetValue } from "react-hook-form";

export enum DirectionEnum {
  BUY = "buy",
  SELL = "sell",
}

export type CustomMUISelectProps<T extends FieldValues> = {
  control: Control<T>;
  initialData: T | undefined;
  name: keyof T;
  options: { value: string; id: number }[];
  setValue: UseFormSetValue<T>;
};

export type CustomMUIRadioGroupProps<T extends FieldValues> = {
  initialData: T | undefined;
  name: keyof T;
  options: { direction: DirectionType }[];
  setValue: UseFormSetValue<T>;
};

export type DirectionType = DirectionEnum;

export type OrderDataType = {
  id?: number;
  cryptocurrency?: string;
  direction?: DirectionType;
  quantity?: number;
  usdValue?: number;
  expirationDate?: string;
};
