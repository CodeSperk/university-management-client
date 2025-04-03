import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester, TQueryParams, TResponseRedux } from "../../../types";
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
    }),
    getAcademicFaculties: builder.query ({
      query: () => {
        return {
          url: "/academicFaculties",
          method: "GET",
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        // console.log("inside Redux", response);

        return {
          data: response?.data,
          meta: response?.meta
        }
      }
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academicFaculties/create-faculty",
        method: "POST",
        body: data,
      })
    }) ,
    getAcademicDepartment: builder.query ({
      query: () => {
        return {
          url: "/departments",
          method: "GET",
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/departments/create-department",
        method: "POST",
        body: data,
      })
    })
  }),
 

  });

export const { useGetSemestersQuery, useAddAcademicSemesterMutation,  useGetAcademicFacultiesQuery, useAddAcademicFacultyMutation, useGetAcademicDepartmentQuery, useAddAcademicDepartmentMutation } = academicSemesterManagementApi;