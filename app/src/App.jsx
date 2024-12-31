import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import AdminLogin from "./pages/Auth/AdminLogin.jsx";
import Appointments from "./pages/Appointments/Appointments.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";
import DoctorReports from "./pages/Admin/Doctors/DoctorReports.jsx";
import DoctorReport from "./pages/Admin/Doctors/DoctorReport.jsx";
import Doctors from "./pages/Doctor/Doctors.jsx";
import Doctor from "./pages/Doctor/Doctor.jsx";
import About from "./pages/About/About.jsx";
import Appointment from "./pages/Appointments/Appointment.jsx";
import "./App.css";

function App() {
  return (
    <div className="app absolute ">
      <Navbar />
      <div className="mt-[60px] h-full w-full ">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/admin/login"} element={<AdminLogin />} />
          <Route
            path={"/admin/reports/doctors"}
            element={<AdminPrivateRoute />}
          >
            <Route
              path={"/admin/reports/doctors"}
              element={<DoctorReports />}
            />
            <Route
              path={"/admin/reports/doctors/:doctorId"}
              element={<DoctorReport />}
            />
          </Route>
          <Route path={"/doctors"} element={<Doctors />} />
          <Route path={"/doctor/:doctorId"} element={<Doctor />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/appointments"} element={<PrivateRoute />}>
            <Route path={"/appointments"} element={<Appointments />} />
            <Route
              path={"/appointments/:appointmentId"}
              element={<Appointment />}
            />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
