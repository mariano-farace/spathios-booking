import React from "react";
import SpaceCard from "./SpaceCard";

const Spaces = ({ spaceList }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "20px",
      }}
    >
      {spaceList.map((space) => (
        <SpaceCard
          key={space.listingID}
          listingID={space.listingID}
          listingName={space.listingName}
          pricePerHour={space.pricePerHour}
          image={space.image}
          description={space.description}
        />
      ))}
    </div>
  );
};

export default Spaces;
