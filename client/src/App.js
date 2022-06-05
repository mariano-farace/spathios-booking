import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import differenceInMinutes from "date-fns/differenceInMinutes";
import areIntervalsOverlapping from "date-fns/areIntervalsOverlapping";
import AvailabilityDisplay from "./components/AvailabilityDisplay";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { hoursRange, setMinutesAndHoursToDate } from "./utils";
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
    const finalStartDate = setMinutesAndHoursToDate(date, e.target.value);
    setStartTime(e.target.value);
    setStartDate(finalStartDate);
  };

  const handleEndTime = (e, date) => {
    const finalEndDate = setMinutesAndHoursToDate(date, e.target.value);
    setEndTime(e.target.value);
    setEndDate(finalEndDate);
  };
  //! Puede haber un error con el tema de cambiar la fecha despeus de haber seteado las horas. Creo que no la va a recalcular bien!!!!! Deberias cambiarlo por un useeffect que dependa de las tres variables= fecha, hora de inicio, hora de fin
  //TODO hacer el descuento del 7% cuando son mas de 8 horas!!
  const calculatePrice = (startDate, endDate, pricePerHour) => {
    const diff = differenceInMinutes(endDate, startDate);
    const hours = diff / 60;
    const price = hours * pricePerHour;
    console.log("price", price);
    return price;
  };

  // Calcula el precio de la reserva cuando se selecciona una fecha y horas
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          variant="dialog"
          format="dd/MM/yyyy"
          margin="normal"
          value={date}
          id="date-picker"
          label="Pick a Date"
          onChange={handleDatePick}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

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
        onClick={() => CheckAvailability(listingBusy, startDate, endDate)}
      >
        Check Availability
      </button>

      {availability && <AvailabilityDisplay availability={availability} />}
    </div>
  );
}

export default App;
