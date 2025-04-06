  export type TSemesterRegistration = {
    _id: string;
    academicSemester: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
    createdAt: Date;
    updatedAt: Date;
    _v?: number
  }