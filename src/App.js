import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Addbirthday from "./Components/Addbirthday";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Displaybirthday from "./Components/Displaybirthday";
import Login from "./Components/Login";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Addbirthday" element={<Addbirthday />} />
        <Route path="/Display" element={<Displaybirthday />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
