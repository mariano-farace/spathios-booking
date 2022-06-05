const router = require("express").Router();
const fs = require("fs").promises;

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

module.exports = router;
