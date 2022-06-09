import React from "react";
import Divider from "@mui/material/Divider";
import "./BookingHeader.css";

const BookingHeader = ({ spaceData }) => {
  return (
    <div>
      {spaceData && (
        <div>
          <div className="base">{spaceData.listingName}</div>
          <Divider />
          <div className="base price">
            <div>
              <div style={{ fontSize: "24px" }}>
                {spaceData.pricePerHour}€ /hora
              </div>
            </div>
            <span>1 h min</span>
          </div>
          <Divider />
          <div className="discount base">
            <span> Descuento 8+ horas</span> <span>7%</span>
          </div>
          <Divider />
        </div>
      )}
    </div>
  );
};

export default BookingHeader;
