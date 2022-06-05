const router = require("express").Router();
const fs = require("fs").promises;

router.get("/all-spaces", async (req, res) => {
  try {
    const rawData = await fs.readFile("./data-base/listings.json");
    let spaces = JSON.parse(rawData);

    res.status(200).json(spaces);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
