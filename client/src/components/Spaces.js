import React from "react";
import SpaceCard from "./SpaceCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Spaces = () => {
  const [spaceList, setSpaceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetched = await axios.get(
          "http://localhost:5000/spaces/all-spaces"
        );
        const spacesArray = fetched.data;
        setSpaceList(spacesArray);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

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
