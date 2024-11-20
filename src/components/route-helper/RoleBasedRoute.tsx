import { useUserSlice } from "@/redux/auth/authSlice";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const RoleBasedRoute = ({ allowedRoles, children }: { allowedRoles: string[]; children: React.ReactNode }) => {
  const auth = useUserSlice();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user?.role === "doctor") {
      navigate("/dashboard");
    }
  }, [auth.user, navigate]);

  if (!auth.success && !auth.token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(auth.user?.role)) {
    return <Navigate to="/404" />;
  }

  return children;
};
