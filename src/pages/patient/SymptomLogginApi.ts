/* eslint-disable @typescript-eslint/no-explicit-any */
import { Errorhandler } from "@/utils/ErrorHandler";
import api from "../../redux/api/base";
import { AIHealthResponse, OverallStatus, setSymptoms } from "@/redux/symptoms/symptomSlice";
import { toast } from "react-toastify";

interface ResponseData {
  createdAt: string;
  response: AIHealthResponse;
  updatedAt: string;
  userId: string;
  _id: string;
}

export interface ResponseResult {
  data: ResponseData[];
}

const symptomApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postSymptom: builder.mutation({
      query: (data) => ({
        url: "/users/logging-symptoms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Records"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSymptoms(JSON.parse(data.text)));
          return data;
        } catch (err) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Errorhandler(err as any);
          return err;
        }
      },
    }),
    updateStatus: builder.mutation<any, { overall_status: string; recordId: string }>({
      query: ({ overall_status, recordId }) => ({
        url: `/users/records/:${recordId}/status`,
        method: "PATCH",
        body: { overall_status },
      }),
      invalidatesTags: ["Records"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setSymptoms(JSON.parse(data.text)));
          toast.success("Status updated successfully", {
            position: "top-right",
          });
          return data;
        } catch (err) {
          Errorhandler(err as any);
          return err;
        }
      },
    }),
    doctorsApproval: builder.mutation<any, DoctorsApprovalRequest>({
      query: ({ doctors_approval, medication, recordId, overall_status }) => ({
        url: `/users/records/${recordId}/doctor-approval`,
        method: "PUT",
        body: { doctors_approval, overall_status, prescribe_medication: medication },
      }),
      invalidatesTags: ["Records"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setSymptoms(JSON.parse(data.text)));
          toast.success("Status updated successfully", {
            position: "top-right",
          });
          return data;
        } catch (err) {
          Errorhandler(err as any);
          return err;
        }
      },
    }),
    deleteRecord: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/users/records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Records"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setSymptoms(JSON.parse(data.text)));
          toast.success("Status delete successfully", {
            position: "top-right",
          });
          return data;
        } catch (err) {
          Errorhandler(err as any);
          return err;
        }
      },
    }),
    records: builder.query<ResponseResult, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/users/records/${id}${status !== "all" ? `?status=${status}` : ""}`,
      }),
      providesTags: ["Records"],
    }),
    recordsStats: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/users/records/stats/${id}`,
      }),
      providesTags: ["Records"],
    }),
    patients: builder.query<PatientsResponse, PatientsRequest>({
      query: ({ search, status }) => ({
        url: "/users/patients",
        method: "GET",
        params: { search, status },
      }),
      providesTags: ["Records"],
    }),
  }),
});

export const {
  usePostSymptomMutation,
  useUpdateStatusMutation,
  usePatientsQuery,
  useRecordsQuery,
  useRecordsStatsQuery,
  useDoctorsApprovalMutation,
  useDeleteRecordMutation,
} = symptomApi;

interface PatientsRequest {
  search: string;
  status: string;
}

export interface DoctorsApprovalRequest {
  doctors_approval: boolean;
  overall_status?: OverallStatus;
  recordId: string;
  medication?: string;
}

// Basic type for the Patient data
export interface Patient {
  _id: string;
  fullname: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  latestRecord?: Record | null;
}

// Type for the Record data
export interface Record {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  response: AIHealthResponse;
}

// Type for the API response
export interface PatientsResponse {
  data: Patient[];
  total: number;
}
