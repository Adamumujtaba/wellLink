import Input from "@/components/Input/Input";
import Button from "@/components/Button/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { UserData } from "./type";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6).max(12),
  fullname: yup.string().required("Full name is required"),
  role: yup.string().required("Role is required"),
});

interface Props {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

function PatientRegisterForm({ onSubmit, isLoading }: Props) {
  const defaultValues = {
    email: "",
    password: "",
    fullname: "",
    role: "patient",
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    // setValue,
  } = useForm<UserData>({ defaultValues, resolver: yupResolver(schema) });
  return (
    <div>
      <div>
        <h2>Patient</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            value={watch("fullname")}
            {...register("fullname")}
            control={control}
            label={"Name"}
            placeholder="Enter your name"
            error={errors.fullname}
          />
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
          <Button title={isLoading ? "Loading..." : "Create"} />
        </form>
      </div>
    </div>
  );
}

export default PatientRegisterForm;
