import setMinutes from "date-fns/setMinutes";
import format from "date-fns/format";
import setHours from "date-fns/setHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
export const hoursRange = [
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00",
];

export const setMinutesAndHoursToDate = (date, timeString) => {
  const [hour, minutes] = timeString.split(":");
  const finalStartDate = setMinutes(setHours(date, hour), minutes);
  return finalStartDate;
};

export const calculatePrice = (startDate, endDate, pricePerHour) => {
  const diff = differenceInMinutes(endDate, startDate);
  const hours = diff / 60;
  const price = hours * pricePerHour;

  return price;
};

export const mailRegex =
  /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

//Will match 9 or more digits in a row in a text
export const phoneRegex = /!*([0-9]!*){9,}$/g;

export const isoStringDateToFormattedString = (isoStringDate) => {
  const date = new Date(isoStringDate);

  return `${format(date, "MMMM do, yyyy HH:mm ")}`;
};
