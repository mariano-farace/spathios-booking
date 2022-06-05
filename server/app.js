const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const reservationRouter = require("./routes/reservation");
//TODO improve error handling
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use("/reservation", reservationRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
