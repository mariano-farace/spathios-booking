import React from "react";
import { isoStringDateToFormattedString } from "../utils";
const Summary = ({ summaryInfo }) => {
  console.log("SummaryInfo:", summaryInfo);
  return (
    <div>
      <h1>Reservation Summary:</h1>
      <div>Check In: {isoStringDateToFormattedString(summaryInfo.checkIn)}</div>
      <div>
        Check Out: {isoStringDateToFormattedString(summaryInfo.checkOut)}
      </div>
      <div>Total: {summaryInfo.totalPrice}€</div>
      <div>Reservation ID: {summaryInfo.reservationID}</div>
      <div>Your message: {summaryInfo.userMessage}</div>
    </div>
  );
};

export default Summary;
