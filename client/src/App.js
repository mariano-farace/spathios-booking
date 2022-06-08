import Reservation from "./components/Reservation";
import Spaces from "./components/Spaces";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Summary from "./components/Summary";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Spaces />} />
          <Route path="/:space" element={<Reservation />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
