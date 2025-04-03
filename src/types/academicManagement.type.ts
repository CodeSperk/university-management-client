export type TAcademicSemester = {
    _id: string;
    name: string;
    year: string;
    code: string;
    startMonth: string;
    endMonth: string;
    createdAt: Date;
    updatedAt: Date;
    _v?: number
  };

  export type TAcademicFaculty = {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _v?: number
  };

  export type TAcademicDepartment = {
    _id: string;
    name: string;
    academicFaculty: TAcademicFaculty;
    createdAt: Date;
    updatedAt: Date;
    _v?: number
  }