import { useEffect, useState } from "react";
import Reservation from "./components/Reservation";
import Spaces from "./components/Spaces";
import axios from "axios";

function App() {
  const [spaces, setSpaces] = useState([]);

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
      <Spaces spaces={spaces} />
      <Reservation />
    </div>
  );
}

export default App;
