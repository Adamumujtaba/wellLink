// import { LoginRequest, LoginResponse } from "./typings";
import { setCredentials } from "../../redux/auth/authSlice";
import api from "../../redux/api/base";
import { Errorhandler } from "@/utils/ErrorHandler";
import { toast } from "react-toastify";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        body: credentials,
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled: qf }) {
        qf.then((data) => {
          dispatch(
            setCredentials({
              success: data.data.success,
              token: data.data.jwt,
              user: data.data.data.user,
            })
          );
        }).catch((err) => {
          Errorhandler(err);
        });
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled: qf }) {
        qf.then((data) => {
          dispatch(
            setCredentials({
              success: data.data.success,
              token: data.data.jwt,
              user: data.data.data.user,
            })
          );
          toast.success("Registration successful", {
            position: "top-right",
          });
        }).catch((err) => {
          // console.log("ErrorHH>>", err.error.data.errors.message);
          Errorhandler(err.error.data);
        });
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
