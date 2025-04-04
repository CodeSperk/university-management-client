import { FieldValues, SubmitHandler } from "react-hook-form";
import UMSForm from "../../../components/form/UMSForm";
import UMSInput from "../../../components/form/UMSInput";
import { Button } from "antd";

const studentDummyData = {
  "name": {
      "firstName": "Mahbub",
      "middleName": "",
      "lastName": "Rahaman"
  },
  "gender": "male",
  "email": "mr.mahbub0921@gmail.com",
  "dateOfBirth": "1993-11-01",
  "contactNo": "01563625363",
  "emergencyContactNo": "01852428440",
  "bloodGroup": "B+",
  "presentAddress": "123, Main Street, Dhaka, Bangladesh",
  "permanentAddress": "456, Elm Street, Chattogram, Bangladesh",
  "guardian": {
      "fatherName": "Robert Doe",
      "fatherOccupation": "Engineer",
      "fatherContactNo": "01711122233",
      "motherName": "Jane Doe",
      "motherOccupation": "Doctor",
      "motherContactNo": "01711223344"
  },
  "localGuardian": {
      "name": "Mark Smith",
      "occupation": "Businessman",
      "contactName": "01711556677",
      "address": "789, Oak Street, Dhaka, Bangladesh"
  },
  "admissionSemester": "67dc9ebd1911ef042d931f5b",
  "academicDepartment": "67dc9dc5c68d5779bf39b11b"
}

const CreateStudent = () => {

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  }

  return (
    <UMSForm onSubmit={onSubmit}>
      <h1>Create a Student</h1>
      <UMSInput type="text" name="name" label="Student Name"/>
      <Button htmlType="submit">Submit</Button>
    </UMSForm>
  );
};

export default CreateStudent;
