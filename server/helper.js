var areIntervalsOverlapping = require("date-fns/areIntervalsOverlapping");
var parseISO = require("date-fns/parseISO");
var differenceInMinutes = require("date-fns/differenceInMinutes");
const Joi = require("joi");

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
  console.log("diff", diff);
  console.log("hours", hours);

  // if hours 8 or more, then price is 93% of the pricePerHour
  if (hours >= 8) {
    console.log("hours > 8", hours);
    return pricePerHour * hours * 0.93;
  } else {
    console.log("hours < 8", hours);
    return hours * pricePerHour;
  }
};

const availabilitySchema = Joi.object({
  id: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

const bookSchema = Joi.object({
  id: Joi.number().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  message: Joi.string().allow(""),
});

module.exports = {
  CheckAvailability,
  calculatePrice,
  availabilitySchema,
  bookSchema,
};
