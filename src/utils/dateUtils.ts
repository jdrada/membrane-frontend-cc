export const convertISOToLocale = (date: string) => {
  return new Date(date).toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
export const convertISOtoUTC = (
  date: string | undefined,
  tableDate: boolean = false
): string => {
  if (!date) {
    return "";
  }
  const d = new Date(date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[d.getUTCDay()];
  const day = d.getUTCDate().toString().padStart(2, "0");
  const monthName = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const hours = d.getUTCHours().toString().padStart(2, "0");
  const minutes = d.getUTCMinutes().toString().padStart(2, "0");

  if (tableDate) {
    return `${dayName}, ${day} ${monthName} ${year}`;
  }
  return `${dayName}, ${day} ${monthName} ${year} ${hours}:${minutes} UTC`;
};
