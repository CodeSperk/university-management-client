import { TQueryParams, TResponseRedux, Tstudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if(args){
            args.forEach((item: TQueryParams) => {
              params.append(item.name, item.value as string)
            })
        }

       return {
        url: "/students",
        method: "GET",
        params: params
       }
      },
      transformResponse: (response: TResponseRedux<Tstudent[]>) =>{
        return {
          data: response?.data,
          meta: response?.meta
        };
      }
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: '/users/create-student',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation, useGetStudentsQuery } =
  userManagementApi;