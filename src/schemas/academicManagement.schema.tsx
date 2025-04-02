import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({required_error: "This Field is required"}),
    year: z.string({required_error: "Please select a year"}),
    startMonth : z.string({required_error: "Please select start month"}),
    endMonth: z.string({required_error: "Please select end month"}),
  });