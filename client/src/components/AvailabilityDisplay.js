import React from "react";
import Alert from "@mui/material/Alert";
const { format } = require("date-fns");
const AvailabilityDisplay = ({ availability }) => {
  console.log("availability from props", availability);

  console.log("availability.status", availability.status);
  return (
    <div>
      {availability.status === "available" && (
        <Alert severity="success">Available - Make your Reservation!!</Alert>
      )}
      {availability.status === ("booked" || "blocked") && (
        <Alert severity="error">
          Sorry, the space has already been {availability.status} from{" "}
          {`${format(new Date(availability.startDateTime), "HH:mm")}`} to{" "}
          {`${format(new Date(availability.endDateTime), "HH:mm")}`} - Please
          choose another time.
        </Alert>
      )}
    </div>
  );
};

export default AvailabilityDisplay;
