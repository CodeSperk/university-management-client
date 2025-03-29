import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSemesters: builder.query({
      query: () => ({
        url: "/semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSemestersQuery } = academicSemesterApi;
