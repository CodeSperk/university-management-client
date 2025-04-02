import { FieldValues, SubmitHandler } from "react-hook-form";
import UMSForm from "../../../components/form/UMSForm";
import { Button, Col, Flex } from "antd";
import UMSSelect from "../../../components/form/UMSSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import {zodResolver} from "@hookform/resolvers/zod"
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map(number => ({
    value: (currentYear + number).toString(),
    label: (currentYear + number).toString()
}))

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const name = semesterOptions[Number(data?.name) - 1]?.label;
    
    const semesterData = {
        name,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth
    }
    console.log(semesterData);
  };

  return (
    <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
      <Col span={12}>
          <UMSForm 
          onSubmit={onSubmit} 
          resolver={zodResolver(academicSemesterSchema)}>
          <UMSSelect
            name="name"
            label="Semester Name :"
            options={semesterOptions}
          />
          <UMSSelect
            name="year"
            label="Year :"
            options={yearOptions}
          />
            <UMSSelect
              name="startMonth"
              label="Start Month :"
              options={monthOptions}
            />
          <UMSSelect
            name="endMonth"
            label="End Month :"
            options={monthOptions}
          />
          <Button htmlType="submit" size="large">Submit</Button>
        </UMSForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
