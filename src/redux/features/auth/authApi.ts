import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth/login",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
