const {
  CheckAvailability,
  calculatePrice,
  availabilitySchema,
  bookSchema,
} = require("../helper");
var uuid = require("uuid");
const router = require("express").Router();
const fs = require("fs").promises;
var format = require("date-fns/format");

// This endpoint is not in use. Could be used to render only available time frames on fronted
router.get("/listingbusy", async (req, res) => {
  const id = req.body.id;
  try {
    const rawData = await fs.readFile("./data-base/listings.json");
    let data = JSON.parse(rawData);

    const space = data.find((element) => element.listingID === id);

    res.status(200).json(space.listingBusy);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/availability", async (req, res) => {
  try {
    await availabilitySchema.validateAsync(req.query);
  } catch (err) {
    const errMsg = err.details[0].message;
    return res.status(400).json({ "status:": "error", message: errMsg });
  }

  const id = parseInt(req.query.id);
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    const rawData = await fs.readFile("./data-base/listings.json");

    let data = JSON.parse(rawData);
    const space = data.find((element) => element.listingID === id);

    const availability = CheckAvailability(
      space.listingBusy,
      startDate,
      endDate
    );
    res.status(200).json(availability);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.post("/book", async (req, res) => {
  try {
    await bookSchema.validateAsync(req.body);
  } catch (err) {
    const errMsg = err.details[0].message;
    return res.status(400).json({ "status:": "error", message: errMsg });
  }

  const id = parseInt(req.body.id);
  const startDateTime = req.body.startDate;
  const endDateTime = req.body.endDate;
  const userMessage = req.body.message;

  const formattedStartDateTime = format(
    new Date(startDateTime),
    "yyyy-MM-dd'T'HH:mm:ss"
  );
  const formattedEndDateTime = format(
    new Date(endDateTime),
    "yyyy-MM-dd'T'HH:mm:ss"
  );

  try {
    const rawData = await fs.readFile("./data-base/listings.json");

    let data = JSON.parse(rawData);

    // Have to get the item index to update it later for the id might not be equal to the index
    var foundIndex = data.findIndex((element) => element.listingID === id);
    const space = data.find((element) => element.listingID === id);

    //Generate a random reservation id
    const reservationID = uuid.v4().split("-")[4];

    //Update space object
    space.listingBusy.push({
      startDateTime: formattedStartDateTime,
      endDateTime: formattedEndDateTime,
      status: "booked",
      reservationID,
    });

    //Replace the old item with the new one by its index number.
    data[foundIndex] = space;

    //Write the new data to the file
    await fs.writeFile("./data-base/listings.json", JSON.stringify(data));

    //precio total de la reserva,
    const price = calculatePrice(
      formattedStartDateTime,
      formattedEndDateTime,
      space.pricePerHour
    );

    res.status(200).json({
      message: "Booking successful",
      reservationID,
      checkIn: formattedStartDateTime,
      checkOut: formattedEndDateTime,
      totalPrice: price,
      listingBusy: space.listingBusy,
      userMessage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
