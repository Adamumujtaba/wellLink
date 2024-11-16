import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cacher } from "../api/rtkQueryCacheUtils";
import { RootState } from "../store";
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  //   if (typeof result.data === "string") {
  //     result.data = { message: result.data };
  //   }

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.token;

    const refreshResult = await baseQuery(
      {
        url: "process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-toke",
        method: "POST",
        body: {
          refreshToken: refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // const user = (api.getState() as RootState).auth.user;
      // api.dispatch(
      //   setCredentials({
      //     token: refreshResult?.data?.jwt,
      //     user,
      //     success: true,
      //   })
      // );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: [...cacher.defaultTags],
  endpoints: () => ({}),
});

export default api;
