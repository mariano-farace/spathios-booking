import React from "react";

const Summary = ({ SummaryInfo }) => {
  return (
    <div>
      <h1>Reservation Summary:</h1>
      <div>Check In: {SummaryInfo.checkIn}</div>
      <div>Check Out: {SummaryInfo.checkOut}</div>
      <div>Total: {SummaryInfo.totalPrice}€</div>
      <div>Reservation ID: {SummaryInfo.reservationID}€</div>
      <div>Your message: {SummaryInfo.userMessage}€</div>

      <div></div>

      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Summary;
