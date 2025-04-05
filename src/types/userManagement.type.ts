export type TStudent = {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: string; 
  bloodGroup:
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-';

  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;

  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactName: string;
    address: string;
  };

  admissionSemester: string;
  academicDepartment: string; 
}
  