import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { useEffect, useState } from "react";
import differenceInHours from "date-fns/differenceInHours";

function App() {
  const pricePerHour = 10;

  const listingBusy = [
    {
      startDateTime: "2022-02-15T08:00:00",
      endDateTime: "2022-02-15T10:30:00",
      status: "booked",
    },
    {
      startDateTime: "2022-02-15T12:00:00",
      endDateTime: "2022-02-15T17:00:00",
      status: "blocked",
    },
  ];

  const [startDateTime, setDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [price, setPrice] = useState();

  const handleStartDateTime = (date) => {
    setDateTime(date);
  };

  const handleEndDateTime = (date) => {
    setEndDateTime(date);
  };

  const calculatePrice = (startDateTime, endDateTime, pricePerHour) => {
    const diff = differenceInHours(endDateTime, startDateTime);
    console.log("diff", diff);
    const price = diff * pricePerHour;
    console.log("price", price);
    return price;
  };

  useEffect(() => {
    if (startDateTime && endDateTime) {
      const price = calculatePrice(startDateTime, endDateTime, pricePerHour);
      setPrice(price);
    } else {
      setPrice(0);
    }
  }, [startDateTime, endDateTime]);

  const CheckAvailability = (listingBusy) => {
    //TODO comprobar el formato de las fecha de listingBusy price!!!!
  };

  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          variant="dialog"
          //format="dd/MM/yyyy"
          margin="normal"
          value={startDateTime}
          id="start-date-time-picker"
          label="Start Date and Time"
          onChange={handleStartDateTime}
          // KeyboardButtonProps={{
          //   "aria-label": "change date",
          // }}
        />
        <DateTimePicker
          variant="dialog"
          margin="normal"
          value={endDateTime}
          id="end-date-time-picker"
          label="End Date and Time"
          onChange={handleEndDateTime}
          // KeyboardButtonProps={{
          //   "aria-label": "change date",
          // }}
        />
      </MuiPickersUtilsProvider>
      <button onClick={() => CheckAvailability(startDateTime, endDateTime)}>
        Check Availability
      </button>
      <div>El precio es:{price}</div>
    </div>
  );
}

export default App;
