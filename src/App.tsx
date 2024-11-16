import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import Landing from "./pages/patient/patientLandingPage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import PrivateRoute from "./components/route-helper/private-route";
import { DoctorsLayout } from "./doctorsLayout";
import DoctorsDashboard from "./pages/doctors/home/DoctorsDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Landing />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/dashboard" element={<DoctorsLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <DoctorsDashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
