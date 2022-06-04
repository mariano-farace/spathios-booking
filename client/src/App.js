import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { useEffect, useState } from "react";
import differenceInMinutes from "date-fns/differenceInMinutes";
import areIntervalsOverlapping from "date-fns/areIntervalsOverlapping";
import AvailabilityDisplay from "./components/AvailabilityDisplay";

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
  const [availability, setAvailability] = useState();

  const handleStartDateTime = (date) => {
    setDateTime(date);
  };

  const handleEndDateTime = (date) => {
    setEndDateTime(date);
  };
  //TODO arreglar esta funcion, solo cuant a partir de una hora, hacerlo con segundos y despues redondear para arriba en horas o medias horas
  //Calculate price based reservation hours, will round up to the nearest o'clock hour
  const calculatePrice = (startDateTime, endDateTime, pricePerHour) => {
    const diff = differenceInMinutes(endDateTime, startDateTime);
    const hours = Math.ceil(diff / 60);
    console.log("differenceInMinutes", diff);
    const price = hours * pricePerHour;
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

  const CheckAvailability = (listingBusy, startDateTime, endDateTime) => {
    const result = listingBusy.find((element) => {
      const isOverlapping = areIntervalsOverlapping(
        {
          start: startDateTime,
          end: endDateTime,
        },
        {
          start: new Date(element.startDateTime),
          end: new Date(element.endDateTime),
        }
      );

      return isOverlapping;
    });
    if (result) {
      console.log(result.status);
      //result takes the form:
      // {
      //   "startDateTime": "2022-02-15T08:00:00",
      //   "endDateTime": "2022-02-15T10:30:00",
      //   "status": "booked" || "blocked"
      // }
      setAvailability(result);
    } else {
      setAvailability({ status: "available" });
    }
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
      <div>El precio es:{price}</div>
      <button
        onClick={() =>
          CheckAvailability(listingBusy, startDateTime, endDateTime)
        }
      >
        Check Availability
      </button>

      {availability && <AvailabilityDisplay availability={availability} />}
    </div>
  );
}

export default App;
