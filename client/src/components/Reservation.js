import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import AvailabilityDisplay from "../components/AvailabilityDisplay";
import Summary from "../components/Summary";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  hoursRange,
  setMinutesAndHoursToDate,
  calculatePrice,
  mailRegex,
  phoneRegex,
} from "../utils";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
function Reservation({ selectedSpace }) {
  const [spaceData, setSpaceData] = useState(null);
  // La fecha seleccionada
  const [date, setDate] = useState(new Date());
  //La hora de inicio seleccionada
  const [startTime, setStartTime] = useState("");
  //La hora de finalización seleccionada
  const [endTime, setEndTime] = useState("");
  //La fecha y hora de inicio de la reserva
  const [startDate, setStartDate] = useState();
  //La fecha y hora de fin de la reserva
  const [endDate, setEndDate] = useState();
  const [price, setPrice] = useState();
  const [availability, setAvailability] = useState();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState();
  const [messageErrorHelperText, setMessageErrorHelperText] = useState();
  const [summaryInfo, setSummaryInfo] = useState();

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
    //Prevent errors and unintended behavior if user changes the date after selecting the time
    setStartTime("");
    setStartDate("");
    setEndTime("");
    setEndDate("");
    //Prevents errors and unintended behavior if user changes the time after checking availability
    setAvailability();
  };
  const handleStartTime = (e, date) => {
    const finalStartDate = setMinutesAndHoursToDate(date, e.target.value);
    setStartTime(e.target.value);
    setStartDate(finalStartDate);
    //Prevents errors and unintended behavior if user changes the time after checking availability
    setAvailability();
  };

  const handleEndTime = (e, date) => {
    const finalEndDate = setMinutesAndHoursToDate(date, e.target.value);
    console.log("finalEndDate:", finalEndDate);
    setEndTime(e.target.value);
    setEndDate(finalEndDate);
    setAvailability();
  };

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

  const CheckAvailability = async (e, id, startDate, endDate) => {
    e.preventDefault();
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

  const messageValidation = (event) => {
    if (event.target.value.match(mailRegex)) {
      setMessageError(true);
      setMessageErrorHelperText("e-mails not allowed");
    } else if (event.target.value.match(phoneRegex)) {
      setMessageError(true);
      setMessageErrorHelperText("Phone numbers not allowed");
    } else {
      setMessageError(false);
      setMessage(event.target.value);
    }
  };

  const createReservation = async (id, startDate, endDate, message) => {
    if (messageError) {
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/reservation/book", {
        id,
        startDate,
        endDate,
        message,
      });
      setSummaryInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <form
          onSubmit={(e) =>
            CheckAvailability(e, spaceData.listingID, startDate, endDate)
          }
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={10}>
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
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required={true}>
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
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required={true}>
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
            </Grid>

            <Grid item xs={6}>
              <div>Total: {price}€</div>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Check Availability
              </Button>
            </Grid>

            <Grid item xs={12}></Grid>
            {availability && (
              <AvailabilityDisplay availability={availability} />
            )}
          </Grid>
        </form>
        {availability && availability.status === "available" && (
          <div>
            <Grid item xs={12}>
              <TextField
                id="message-text-field"
                onChange={(event) => messageValidation(event)}
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                helperText={messageErrorHelperText}
                error={messageError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
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
            </Grid>
          </div>
        )}
        {summaryInfo && <Summary summaryInfo={summaryInfo} />}
      </div>
    </div>
  );
}

export default Reservation;
