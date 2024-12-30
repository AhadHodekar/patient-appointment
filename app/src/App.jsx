import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Appointments from "./pages/Appointments/Appointments.jsx";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Doctors from "./pages/Doctor/Doctors.jsx";

function App() {
  return (
    <div className="app absolute">
      <Navbar />
      <div className="mt-[60px] h-[calc(100%-60px)] w-full">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/doctors"} element={<Doctors />} />
          <Route path={"/appointments"} element={<PrivateRoute />}>
            <Route path={"/appointments"} element={<Appointments />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
