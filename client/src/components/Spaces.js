import React from "react";
import SpaceCard from "./SpaceCard";

const Spaces = ({ spaces }) => {
  return (
    <div>
      {spaces.map((space) => (
        <SpaceCard
          key={space.listingID}
          listingID={space.listingID}
          listingName={space.listingID}
          pricePerHour={space.pricePerHour}
          image={space.image}
          description={space.description}
        />
      ))}
    </div>
  );
};

export default Spaces;
