import Input from "@/components/Input/Input";
import Button from "@/components/Button/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
      <div
        style={{
          maxWidth: "400px",
          background: "#dde1e7",
          boxShadow: "-5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3)",
          borderRadius: "3px!important",
          border: "none",
          padding: " 30px",
          color: "#000",
          width: "90% ",
        }}
      >
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
          <Button title={isLoading ? "Loading..." : "Create"} />
        </form>
      </div>
    </div>
  );
}

export default DoctorRegisterForm;
