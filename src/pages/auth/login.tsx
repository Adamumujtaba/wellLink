import Button from "@/components/Button/button";
import Input from "@/components/Input/Input";
import { useLoginMutation } from "./auth-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserData {
  email: string;
  password: string;
}

const defaultValues = {
  email: "",
  password: "",
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6).max(12),
});

function Login() {
  const [Login, { isLoading, isSuccess, data }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    // setValue,
  } = useForm<UserData>({ defaultValues, resolver: yupResolver(schema) });

  const userRole = useMemo(() => data?.data?.user.role, [data?.data?.user.role]);

  const destinationPath = useMemo(() => {
    if (isSuccess && userRole === "doctor") {
      return "/dashboard";
    }
    if (isSuccess && userRole === "admin") {
      return "/admin";
    }
    return "/";
  }, [isSuccess, userRole]);

  useEffect(() => {
    if (isSuccess) {
      navigate(destinationPath);
    }
  }, [isSuccess, navigate, destinationPath]);

  const onSubmit = (data: UserData) => {
    Login({ ...data, email: data.email.toLocaleLowerCase() });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        background: "#dde1e7",
        boxShadow: "-5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3)",
        borderRadius: "3px!important",
        border: "none",
        padding: " 25px",
        color: "#000",
        width: "80%",
        margin: "10rem auto",
      }}
    >
      <h2>Login page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          value={watch("email")}
          {...register("email")}
          control={control}
          label={"Email"}
          placeholder="Enter your email address"
          error={errors.email}
        />
        <Input
          type="text"
          value={watch("password")}
          {...register("password")}
          control={control}
          label={"Password"}
          placeholder="Enter your password address"
          error={errors.password}
        />
        <Button disabled={isLoading} title={isLoading ? "Logging..." : "Login"} />
      </form>
      <p>Forgot Email / Password?</p>
      <p>
        Don't have an account <Link to="/register">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
