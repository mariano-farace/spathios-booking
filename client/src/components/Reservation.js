import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import AvailabilityDisplay from "../components/AvailabilityDisplay";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { hoursRange, setMinutesAndHoursToDate, calculatePrice } from "../utils";
import { Button } from "@mui/material";
function Reservation({ selectedSpace }) {
  const [spaceData, setSpaceData] = useState(null);
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
  const [message, setMessage] = useState("");

  // Will fetch information about selected space
  useEffect(() => {
    const fetchData = async () => {
      //Implementar el set loading
      // setLoading(true);
      try {
        const fetched = await axios.get(
          `http://localhost:5000/spaces/${selectedSpace}`
        );
        const spaceData = fetched.data;
        setSpaceData(spaceData);
      } catch (error) {
        console.error(error.message);
      }
      //setLoading(false);
    };

    fetchData();
  }, [selectedSpace]);

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
    console.log("finalEndDate:", finalEndDate);
    setEndTime(e.target.value);
    setEndDate(finalEndDate);
  };
  //! Puede haber un error con el tema de cambiar la fecha despeus de haber seteado las horas. Creo que no la va a recalcular bien!!!!! Deberias cambiarlo por un useeffect que dependa de las tres variables= fecha, hora de inicio, hora de fin
  //TODO hacer el descuento del 7% cuando son mas de 8 horas!!

  // Calcula el precio de la reserva cuando se selecciona una fecha y horas
  useEffect(() => {
    if (startDate && endDate) {
      const price = calculatePrice(startDate, endDate, spaceData.pricePerHour);
      setPrice(price);
    } else {
      setPrice(0);
    }
  }, [startDate, endDate, spaceData]);

  const CheckAvailability = async (id, startDate, endDate) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/reservation/availability",
        {
          params: { id, startDate, endDate },
        }
      );
      setAvailability(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createReservation = async (id, startDate, endDate, message) => {
    try {
      const res = await axios.post("http://localhost:5000/reservation/book", {
        id,
        startDate,
        endDate,
        message,
      });
      console.log("reservation response:", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          variant="dialog"
          inputFormat="dd/MM/yyyy"
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
      <Button
        variant="contained"
        onClick={() =>
          CheckAvailability(spaceData.listingID, startDate, endDate)
        }
      >
        Check Availability
      </Button>

      {availability && <AvailabilityDisplay availability={availability} />}
      {availability && availability.status === "available" && (
        <div>
          <TextField
            id="message-text-field"
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            variant="outlined"
            size="small"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            onClick={() =>
              createReservation(
                spaceData.listingID,
                startDate,
                endDate,
                message
              )
            }
          >
            Book Now
          </Button>
        </div>
      )}
    </div>
  );
}

export default Reservation;
