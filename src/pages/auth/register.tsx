import { useEffect, useMemo, useState } from "react";
import { TabButton, TabContainer, TabPanel } from "@/components/tab";
import PatientRegisterForm from "./patient-register";
import DoctorRegisterForm from "./doctor-register";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./auth-api";
import { UserData } from "./type";

function Register() {
  const [handleRegister, { isLoading, data, isSuccess }] = useRegisterMutation();
  const [user, setUser] = useState("patient");
  const handleTabSwitch = (val: string) => setUser(val);
  const navigate = useNavigate();

  const userRole = useMemo(() => data?.user?.role, [data?.user?.role]);

  const destinationPath = useMemo(() => {
    if (isSuccess && userRole === "doctor") {
      return "/doctor";
    }
    return "/";
  }, [isSuccess, userRole]);

  useEffect(() => {
    if (isSuccess) {
      navigate(destinationPath);
    }
  }, [isSuccess, navigate, destinationPath]);

  const onSubmit = (data: UserData) => {
    handleRegister(data);
  };

  return (
    <div style={{ maxWidth: "400px", width: "90% ", margin: "10rem auto" }}>
      <TabContainer>
        <TabButton active={user === "patient"} onClick={() => handleTabSwitch("patient")}>
          Patient
        </TabButton>
        <TabButton active={user === "doctor"} onClick={() => handleTabSwitch("doctor")}>
          Doctor
        </TabButton>
      </TabContainer>
      <TabPanel active={user === "patient"}>
        <PatientRegisterForm onSubmit={onSubmit} isLoading={isLoading} />
      </TabPanel>
      <TabPanel active={user === "doctor"}>
        <DoctorRegisterForm onSubmit={onSubmit} isLoading={isLoading} />
      </TabPanel>
      Already have an account <Link to="/login">Login</Link>
    </div>
  );
}

export default Register;
