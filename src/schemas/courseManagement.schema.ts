import { z } from "zod";

export const semesterRegistrationSchema = z.object({
    academicSemester: z.string({required_error: "This Field is required"}),
    startDate: z.any().refine((val) => val && !isNaN(new Date(val).getTime()), {
      message: "Start date is required",
    }),
    endDate: z.any().refine((val) => val && !isNaN(new Date(val).getTime()), {
      message: "End date is required",
    }),
    minCredit: z.string({required_error: "Provide min credit"}),
    maxCredit: z.string({required_error: "Provide max credit"}),
  });