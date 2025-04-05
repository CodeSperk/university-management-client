import { z } from "zod";


//
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters long')
    .max(10, 'First name cannot exceed 10 characters'),
  middleName: z
    .string()
    .trim()
    .max(50, 'Middle name cannot exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot exceed 50 characters'),
});

const createGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(2, 'Father name must be at least 2 characters long'),
  fatherOccupation: z
    .string()
    .trim()
    .min(2, 'Father occupation must be at least 2 characters long'),
  fatherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Father contact number must be between 10 to 15 digits',
    ),
  motherName: z
    .string()
    .trim()
    .min(2, 'Mother name must be at least 2 characters long'),
  motherOccupation: z
    .string()
    .trim()
    .min(2, 'Mother occupation must be at least 2 characters long'),
  motherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Mother contact number must be between 10 to 15 digits',
    ),
});

const createLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Local guardian's name must be at least 2 characters long"),
  occupation: z
    .string()
    .trim()
    .min(2, "Local guardian's occupation must be at least 2 characters long"),
  contactName: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Local guardian contact number must be between 10 to 15 digits',
    ),
  address: z
    .string()
    .trim()
    .min(5, "Local guardian's address must be at least 5 characters long"),
});

export const createStudentSchema = z.object({
    name: createUserNameValidationSchema,
    gender: z.enum(['male', 'female'], {
      message: 'Select a gender',
    }),
    email: z.string().trim().email({ message: 'Invalid email format' }),
    contactNo: z
      .string()
      .trim()
      .regex(/^\d{10,15}$/, {
        message: 'Contact number must be between 10 to 15 digits',
      }),
      profileImg: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'Image is required' })
    .optional(),
    
    emergencyContactNo: z
      .string()
      .trim()
      .regex(/^\d{10,15}$/, {
        message: 'Emergency contact number must be between 10 to 15 digits',
      }),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
      .optional(),
    presentAddress: z.string().trim().min(5, {
      message: 'Present address must be at least 5 characters long',
    }),
    permanentAddress: z.string().trim().min(5, {
      message: 'Permanent address must be at least 5 characters long',
    }),
    guardian: createGuardianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    admissionSemester: z.string(),
    academicDepartment: z.string(),
  });