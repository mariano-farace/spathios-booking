import setMinutes from "date-fns/setMinutes";
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
  "00:00",
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
