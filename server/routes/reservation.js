const { CheckAvailability } = require("../helper");

const router = require("express").Router();
const fs = require("fs").promises;

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
  //TODO handle empty request with 400
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
    console.log("availability", availability);
    res.status(200).json(availability);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
