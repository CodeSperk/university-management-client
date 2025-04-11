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


export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  prefix: z.string().min(1, "Prefix is required"),
  code: z.string(),
  credits: z.string(),
  preRequisiteCourses: z.array(z.string()).optional(),
})