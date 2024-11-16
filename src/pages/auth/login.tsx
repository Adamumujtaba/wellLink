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
    return "/";
  }, [isSuccess, userRole]);

  useEffect(() => {
    if (isSuccess) {
      navigate(destinationPath);
    }
  }, [isSuccess, navigate, destinationPath]);

  const onSubmit = (data: UserData) => {
    Login(data);
  };

  return (
    <div style={{ maxWidth: "400px", width: "90% ", margin: "10rem auto" }}>
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
        <Button title={isLoading ? "Logging..." : "Login"} />
      </form>
      Don't have an account <Link to="/register">Signup</Link>
    </div>
  );
}

export default Login;