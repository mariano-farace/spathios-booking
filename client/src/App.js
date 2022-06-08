import { useEffect, useState } from "react";
import Reservation from "./components/Reservation";
import Spaces from "./components/Spaces";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Summary from "./components/Summary";

function App() {
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
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Spaces spaceList={spaceList} />} />
          <Route path="/:space" element={<Reservation />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
