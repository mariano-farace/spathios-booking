var areIntervalsOverlapping = require("date-fns/areIntervalsOverlapping");
var parseISO = require("date-fns/parseISO");
var differenceInMinutes = require("date-fns/differenceInMinutes");

const CheckAvailability = (listingBusy, startDateTime, endDateTime) => {
  //If no overlap, will return undefined. If overlap, will return the object with the overlap with this form:
  //result takes the form:
  // {
  //   "startDateTime": "2022-02-15T08:00:00",
  //   "endDateTime": "2022-02-15T10:30:00",
  //   "status": "booked" || "blocked"
  // }

  const result = listingBusy.find((element) => {
    const isOverlapping = areIntervalsOverlapping(
      {
        start: parseISO(startDateTime),
        end: parseISO(endDateTime),
      },
      {
        start: new Date(element.startDateTime),
        end: new Date(element.endDateTime),
      }
    );

    return isOverlapping;
  });
  if (result) {
    return result;
  } else {
    return { status: "available" };
  }
};

const calculatePrice = (startDate, endDate, pricePerHour) => {
  const diff = differenceInMinutes(endDate, startDate);
  const hours = diff / 60;

  // if hours 8 or more, then price is 93% of the pricePerHour
  if (hours >= 8) {
    return pricePerHour * hours * 0.93;
  } else {
    return hours * pricePerHour;
  }
};

module.exports = { CheckAvailability, calculatePrice };
