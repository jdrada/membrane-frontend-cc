export const capitalizeFirstLetter = (str: string | undefined) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const substring = (str: string, start: number, end: number) => {
  return str.substring(start, end);
};
