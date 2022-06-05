import { useEffect, useState } from "react";
import Reservation from "./components/Reservation";
import Spaces from "./components/Spaces";
import axios from "axios";

function App() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //Implementar el set loading
      // setLoading(true);
      try {
        const fetched = await axios.get(
          "http://localhost:5000/spaces/all-spaces"
        );
        const spacesArray = fetched.data;
        setSpaces(spacesArray);
      } catch (error) {
        console.error(error.message);
      }
      //setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {!selectedSpace ? (
        <Spaces spaces={spaces} setSelectedSpace={setSelectedSpace} />
      ) : (
        <Reservation selectedSpace={selectedSpace} />
      )}
    </div>
  );
}

export default App;
