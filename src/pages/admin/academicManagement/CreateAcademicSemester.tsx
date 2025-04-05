import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import UMSForm from "../../../components/form/UMSForm";
import { Button, Col, Flex } from "antd";
import UMSSelect from "../../../components/form/UMSSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import {zodResolver} from "@hookform/resolvers/zod"
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicSemester } from "../../../types";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map(number => ({
    value: (currentYear + number).toString(),
    label: (currentYear + number).toString()
}))

const CreateAcademicSemester = () => {
  const methods = useForm({
    resolver: zodResolver(academicSemesterSchema),
  });

  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const {data} = useGetAcademicFacultiesQuery(undefined);
  console.log("Faculty", data);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating..")
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    
    const semesterData = {
        name,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth
    }

    try{
      console.log(semesterData);
      const res = await addAcademicSemester(semesterData) as TResponse<TAcademicSemester>;

      if(res.error){
        toast.error(res.error?.data?.message, {id: toastId});
      }else{
        toast.success("Semester Created Successfylly", {id: toastId})
        methods.reset();
      }
    }catch(err: any){
      toast.error(err.error, {id: toastId})
    }

  };

  return (
    <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
      <Col span={12}>
          <UMSForm 
          onSubmit={onSubmit} 
          methods={methods}
          >
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
