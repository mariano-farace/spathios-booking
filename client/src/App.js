import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useEffect, useState } from "react";
import differenceInMinutes from "date-fns/differenceInMinutes";
import areIntervalsOverlapping from "date-fns/areIntervalsOverlapping";
import AvailabilityDisplay from "./components/AvailabilityDisplay";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
function App() {
  const pricePerHour = 10;

  const hoursRange = [
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
  // La fecha seleccionada
  const [date, setDate] = useState();
  //La hora de inicion seleccionada
  const [startTime, setStartTime] = useState("");
  //La hora de finalizacion seleccionada
  const [endTime, setEndTime] = useState("");
  //La fecha y hora de inicio de la reserva
  const [startDate, setStartDate] = useState();
  //La fecha y hora de fin de la reserva
  const [endDate, setEndDate] = useState();

  const [price, setPrice] = useState();
  const [availability, setAvailability] = useState();

  const handleDatePick = (date) => {
    console.log("date from picker:", date);
    setDate(date);
  };

  const handleStartTime = (e, date) => {
    const timeString = e.target.value;
    const [hour, minutes] = timeString.split(":");
    const finalStartDate = setMinutes(setHours(date, hour), minutes);
    setStartTime(e.target.value);
    setStartDate(finalStartDate);
  };

  const handleEndTime = (e, date) => {
    const timeString = e.target.value;
    const [hour, minutes] = timeString.split(":");
    const finalEndDate = setMinutes(setHours(date, hour), minutes);
    setEndTime(e.target.value);
    setEndDate(finalEndDate);
  };

  //TODO arreglar esta funcion, solo cuant a partir de una hora, hacerlo con segundos y despues redondear para arriba en horas o medias horas
  //Calculate price based reservation hours, will round up to the nearest o'clock hour
  const calculatePrice = (startDate, endDate, pricePerHour) => {
    const diff = differenceInMinutes(endDate, startDate);
    const hours = Math.ceil(diff / 60);
    console.log("differenceInMinutes", diff);
    const price = hours * pricePerHour;
    console.log("price", price);
    return price;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const price = calculatePrice(startDate, endDate, pricePerHour);
      setPrice(price);
    } else {
      setPrice(0);
    }
  }, [startDate, endDate]);

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
        <KeyboardDatePicker
          variant="dialog"
          format="dd/MM/yyyy"
          margin="normal"
          value={date}
          id="date-picker"
          label="Pick a Date"
          onChange={handleDatePick}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <FormControl fullWidth>
        <InputLabel id="start-time">From:</InputLabel>
        <Select
          labelId="start-time"
          id="start-time"
          label="Age"
          value={startTime}
          onChange={(e) => handleStartTime(e, date)}
        >
          {hoursRange.map((hourInterval) => (
            <MenuItem key={hourInterval} value={hourInterval}>
              {hourInterval}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="end-time">To:</InputLabel>
        <Select
          labelId="end-time"
          id="end-time"
          label="Age"
          value={endTime}
          onChange={(e) => handleEndTime(e, date)}
        >
          {hoursRange.map((hourInterval) => (
            <MenuItem key={hourInterval} value={hourInterval}>
              {hourInterval}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>El precio es:{price}</div>
      <button
        onClick={() => CheckAvailability(listingBusy, startTime, endTime)}
      >
        Check Availability
      </button>

      {availability && <AvailabilityDisplay availability={availability} />}
    </div>
  );
}

export default App;
