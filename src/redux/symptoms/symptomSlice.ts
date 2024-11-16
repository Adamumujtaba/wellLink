import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";

export type OverallStatus = "Caution" | "Stable" | "High Risk";

// interface Recommendation {
//   id: string;
//   type: "Monitoring" | "Rest" | "Hydration";
//   advice: string;
// }

export interface AIHealthResponse {
  symptoms: string;
  overall_status: OverallStatus;
  prescribe_medication: string;
  recommendations: string;
  next_steps: string;
  doctor_approved: boolean;
}

// Fix the PayloadAction type
const setPayload = (_state: AIHealthResponse, { payload }: PayloadAction<AIHealthResponse>) => {
  return payload;
};

const initialState: AIHealthResponse = {
  prescribe_medication: "",
  overall_status: "Caution",
  next_steps: "",
  symptoms: "",
  recommendations: "",
  doctor_approved: false,
};

const symptomsSlice = createSlice({
  name: "symptoms",
  initialState,
  reducers: {
    setSymptoms: setPayload,
    clearSymptoms() {
      storage.removeItem("symptoms");
      return initialState;
    },
  },
});

export const { setSymptoms, clearSymptoms } = symptomsSlice.actions;

// Define the RootState type
interface RootState {
  symptoms: AIHealthResponse;
}

// Fix the selector
export const useSymptomsSlice = () => useSelector((state: RootState) => state.symptoms);

export const useSymptoms = () => {
  const symptoms = useSelector((state: RootState) => state.symptoms);
  return symptoms;
};

export const symptomsReducer = symptomsSlice.reducer;

// export default persistReducer(persistConfig, symptomsReducer);
