import { TQueryParams, TResponseRedux, TSemesterRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRegisteredSemesters: builder.query({
              query: (args) => {
                const params = new URLSearchParams();
                if(args){
                    args.forEach((item: TQueryParams) => {
                      params.append(item.name, item.value as string)
                    })
                }
        
               return {
                url: "/semester-registrations",
                method: "GET",
                params: params
               }
              },
              transformResponse: (response: TResponseRedux<TSemesterRegistration[]>) =>{
                return {
                  data: response?.data,
                  meta: response?.meta
                };
              }
            }),
        addSemesterRegistration : builder.mutation({
            query:(data) => ({
                url: "/semester-registrations/create-semesterRegistration",
                method: "POST",
                body: data,
            })
        })
    })
})

export const {useAddSemesterRegistrationMutation, useGetRegisteredSemestersQuery} = courseManagement;