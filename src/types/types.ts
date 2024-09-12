import { FieldValues, Control, UseFormSetValue } from "react-hook-form";

export enum DirectionEnum {
  BUY = "buy",
  SELL = "sell",
}

export type CustomMUISelectProps<T extends FieldValues> = {
  control: Control<T>;
  initialData: T | undefined;
  name: keyof T;
  options: BlockchainType[];
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
  id?: string;
  cryptocurrency?: string;
  direction?: DirectionType;
  quantity?: number;
  usdValue?: number;
  expirationDate?: string;
};

export type BlockchainType = {
  id: number;
  name: string;
  symbol: string;
};
