import { isoStringDateToFormattedString } from "../utils";
import "./Summary.css";
const Summary = ({ summaryInfo }) => {
  return (
    <div className="summary">
      <h1 className="summaryTitle">Reservation Summary</h1>
      <div className="summaryItem">
        <span>Check In</span>
        <span>{isoStringDateToFormattedString(summaryInfo.checkIn)}</span>
      </div>
      <div className="summaryItem">
        <span>Check Out:</span>
        <span>{isoStringDateToFormattedString(summaryInfo.checkOut)}</span>
      </div>
      <div className="summaryItem">
        <span>Reservation ID:</span>
        <span>{summaryInfo.reservationID}</span>
      </div>
      <div className="summaryItem total">
        <span>Total</span>
        <span>{summaryInfo.totalPrice}€</span>
      </div>
    </div>
  );
};

export default Summary;
