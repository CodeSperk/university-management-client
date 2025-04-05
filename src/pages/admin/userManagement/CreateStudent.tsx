import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import UMSForm from "../../../components/form/UMSForm";
import UMSInput from "../../../components/form/UMSInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import UMSSelect from "../../../components/form/UMSSelect";
import { bloodGroupOntions, genderOptions } from "../../../constants/global";
import UMSDate from "../../../components/form/UMSDatePicker";
import {
  useGetAcademicDepartmentQuery,
  useGetSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentSchema } from "../../../schemas/userManagement.schema";
import { toast } from "sonner";
import { TResponseRedux, Tstudent } from "../../../types";


const CreateStudent = () => {
  const methods = useForm({
    resolver: zodResolver(createStudentSchema),
  });
  // send student data
  const [addStudent] = useAddStudentMutation();

  //get Academic Semester data
  const { data: semesterData, isLoading: sIsLoading } =
    useGetSemestersQuery(undefined);

  //get academic departmentData
  const { data: deptData, isLoading: deptIsLoading } =
    useGetAcademicDepartmentQuery(undefined, { skip: sIsLoading });

  const semesterOptions =
    semesterData?.data?.map((item) => ({
      value: item._id,
      label: `${item.name}-${item.year}`,
    })) || [];

  const departmentOptions = deptData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (studentData) => {
    const toastId = toast.loading("Creating..");

    const formattedData = {
      ...studentData,
      dateOfBirth: studentData.dateOfBirth
        ? studentData.dateOfBirth.format("YYYY-MM-DD")
        : undefined,
    };
    console.log(studentData.profileImg);

    const formData = new FormData();
    formData.append("data", JSON.stringify(formattedData));
    formData.append("file", studentData.profileImg);

    try {
      const res = (await addStudent(formData)) as TResponseRedux<Tstudent>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Student Created Successfylly", { id: toastId });
        methods.reset();
      }
    } catch (err: any) {
      toast.error(err.error, { id: toastId });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "36px" }}>
      <Col span={24}>
        <UMSForm onSubmit={onSubmit}  methods={methods} >
          <h1 style={{ marginBottom: "20px" }}>Create a Student</h1>

          <Divider>Personale Info</Divider>
          {/* Name Field */}
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput type="text" name="name.lastName" label="Last Name" />
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSDate name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOntions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Photo">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])
                      }
                      size="large"
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput type="text" name="contactNo" label="Contact Number" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="guardian.fatherName"
                label="Father's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father's Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="guardian.motherName"
                label="Mother's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother's Contact No."
              />
            </Col>
          </Row>

          <Divider>Local Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="localGuardian.contactName"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }}>
              <UMSSelect
                name="admissionSemester"
                label="Admission Semester"
                options={semesterOptions || []}
                disabled={sIsLoading}
              />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <UMSSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions || []}
                disabled={deptIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit" size="large">
            Submit
          </Button>
        </UMSForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
