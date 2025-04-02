import { TAcademicSemester, TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicSemesterManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if(args){
            args.forEach((item: TQueryParams) => {
              params.append(item.name, item.value as string)
            })
        }

       return {
        url: "/semesters",
        method: "GET",
        params: params
       }
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) =>{
        // console.log("inside redux", response)
        return {
          data: response?.data,
          meta: response?.meta
        };
      }
    }),
    addAcademicSemester: builder.mutation({
        query:(data) => ({
            url: "/semesters/create-semester",
            method: "POST",
            body: data,
        })
    })
  }),
});

export const { useGetSemestersQuery, useAddAcademicSemesterMutation } = academicSemesterManagementApi;