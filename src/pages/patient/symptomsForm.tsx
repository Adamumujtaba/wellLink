import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input/Input";
import styled from "styled-components";
import * as yup from "yup";
import Button from "@/components/Button/button";
import { useUserSlice } from "@/redux/auth/authSlice";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";
import { Warning2 } from "iconsax-react";

interface UserData {
  userId?: string;
  age: string;
  smoker: string;
  gender: string;
  symptoms: string;
  known_allergies: string;
  chronic_conditions: string;
  // diet: string;
}
const defaultValues = {
  age: "",
  known_allergies: "",
  smoker: "",
  gender: "",
  symptoms: "",
  chronic_conditions: "",
  // diet: "",
};

const schema = yup.object().shape({
  age: yup.string().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  symptoms: yup.string().required("Physical activity is required"),
  known_allergies: yup.string().required("Known allergies are required"),
  smoker: yup.string().required("Smoking status is required"),
  chronic_conditions: yup.string().required("Chronic conditions are required"),
});

interface Props {
  handlePostSymptoms: (data: UserData) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

function SymptomsForm({ handlePostSymptoms, isLoading, isSuccess }: Props) {
  const { user } = useUserSlice();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<UserData>({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit = (data: UserData) => {
    const dataToSubmit = {
      userId: user.id,
      age: data.age,
      gender: data.gender,
      known_allergies: data.known_allergies,
      chronic_conditions: data.chronic_conditions,
      smoker: data.smoker,
      symptoms: data.symptoms,
    };
    console.log(dataToSubmit);

    handlePostSymptoms(dataToSubmit);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <div>
      {isLoading ? (
        <>
          <div>
            <Lottie animationData={loadingAnimation} style={{ height: "50vh" }} loop={true} />
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              <textarea
                value={watch("symptoms")}
                {...register("symptoms", {
                  required: "symptoms is required",
                })}
                style={{
                  background: "#dde1e7",
                  boxShadow:
                    " inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3)",
                  borderRadius: "3px !important",
                  border: "none",
                  padding: " 10px 20px",
                  height: " 80px",
                  color: "#000",
                  outline: " none",
                  fontSize: "medium",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                // control={control}
                // label={"Symptoms "}
                placeholder="How are you feeling..."
                // error={errors.symptoms}
              />
              {errors && <span style={{ color: "red", fontSize: "12px" }}>{errors?.symptoms?.message}</span>}
            </p>
            <Input
              type="text"
              value={watch("chronic_conditions")}
              {...register("chronic_conditions", {
                required: "chronic_conditions is required",
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("chronic_conditions", e.target.value);
              }}
              control={control}
              label={"Chronic Conditions (Type 'None' if not applicable)"}
              placeholder="Do you have any chronic conditions"
              error={errors.chronic_conditions}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <Input
                type="text"
                value={watch("age")}
                {...register("age", {
                  required: "Age is required",
                })}
                control={control}
                label={"Age"}
                placeholder="Enter your age"
                error={errors.age}
              />

              <Input
                type="text"
                value={watch("known_allergies")}
                {...register("known_allergies", {
                  required: "known_allergies is required",
                })}
                control={control}
                label={"Known Allergies"}
                placeholder="Enter your known_allergies"
                error={errors.known_allergies}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                width: "100%",
              }}
            >
              <RadioGroup>
                <RadioLabel>Gender: </RadioLabel>
                <RadioOption>
                  <input type="radio" id="gender-male" {...register("gender")} value="male" />
                  <label htmlFor="gender-male">Male</label>

                  <input type="radio" id="female" {...register("gender")} value="female" />
                  <label htmlFor="female">Female </label>
                </RadioOption>
                {errors && <span style={{ color: "red", fontSize: "12px" }}>{errors?.gender?.message}</span>}
              </RadioGroup>

              <RadioGroup>
                <RadioLabel>Smoke: </RadioLabel>
                <RadioOption>
                  <input type="radio" id="smoke-yes" {...register("smoker")} value="Yes" />
                  <label htmlFor="smoke-yes">Yes</label>

                  <input type="radio" id="smoke-no" {...register("smoker")} value="No" />
                  <label htmlFor="smoke-no">No</label>
                </RadioOption>
                {errors && <span style={{ color: "red", fontSize: "12px" }}>{errors?.smoker?.message}</span>}
              </RadioGroup>
            </div>
            <div>
              <Button style={{ color: "#3e98c7" }} title={isLoading ? "Loading..." : "Submit"} />
            </div>
          </form>

          <p style={{ display: "flex", gap: 2, background: "#EFEBDBD4", padding: 4, fontSize: "small" }}>
            <Warning2 color="#E5B804" /> The AI consultation provided by WellLink is a preliminary assessment.
          </p>
        </>
      )}
    </div>
  );
}

export default SymptomsForm;

const RadioGroup = styled.div`
  margin-bottom: 1rem;
  min-width: 50%;
`;

const RadioLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
