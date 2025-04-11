import { TAcademicSemester } from "./academicManagement.type";

  export type TSemesterRegistration = {
    _id: string;
    academicSemester: TAcademicSemester;
    status: string,
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCreding: number;
  }


  export type TCourse = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: { course: string | null; isDeleted: boolean }[];
    updatedAt: string;
  };
  
  