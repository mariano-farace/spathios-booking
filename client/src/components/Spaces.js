import React from "react";
import SpaceCard from "./SpaceCard";

const Spaces = ({ spaces, setSelectedSpace }) => {
  return (
    <div>
      {spaces.map((space) => (
        <SpaceCard
          key={space.listingID}
          listingID={space.listingID}
          listingName={space.listingName}
          pricePerHour={space.pricePerHour}
          image={space.image}
          description={space.description}
          setSelectedSpace={setSelectedSpace}
        />
      ))}
    </div>
  );
};

export default Spaces;
