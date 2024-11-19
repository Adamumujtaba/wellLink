import Input from "@/components/Input/Input";
import Button from "@/components/Button/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthWarpper } from "./auth-style";

interface UserData {
  email: string;
  password: string;
  fullname: string;
  role: string;
}

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

function DoctorRegisterForm({ onSubmit, isLoading }: Props) {
  const defaultValues = {
    email: "",
    password: "",
    fullname: "",
    role: "doctor",
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
      <AuthWarpper>
        <h2>Doctor</h2>
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
            placeholder="Enter your password "
            error={errors.password}
          />
          <Button disabled={isLoading} title={isLoading ? "Loading..." : "Create"} />
        </form>
      </AuthWarpper>
    </div>
  );
}

export default DoctorRegisterForm;
