import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import Landing from "./pages/patient/patientLandingPage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { DoctorsLayout } from "./doctorsLayout";
import DoctorsDashboard from "./pages/doctors/home/DoctorsDashboard";
import NotFound from "./NotFound";
import { RoleBasedRoute } from "./components/route-helper/RoleBasedRoute";
import AdminDashboard from "./pages/admin/admin";

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
              <RoleBasedRoute allowedRoles={["patient"]}>
                <Landing />
              </RoleBasedRoute>
            }
          />
        </Route>

        {/* Doctor routes */}
        <Route path="/dashboard" element={<DoctorsLayout />}>
          <Route
            index
            element={
              <RoleBasedRoute allowedRoles={["doctor"]}>
                <DoctorsDashboard />
              </RoleBasedRoute>
            }
          />
        </Route>
        <Route path="/admin" element={<DoctorsLayout />}>
          <Route
            index
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
