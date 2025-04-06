import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import UMSForm from "../../../components/form/UMSForm";
import { Button, Col, Flex } from "antd";
import UMSSelect from "../../../components/form/UMSSelect";
import { useGetSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import UMSDate from "../../../components/form/UMSDatePicker";
import UMSInput from "../../../components/form/UMSInput";
import { toast } from "sonner";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse, TSemesterRegistration } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { semesterRegistrationSchema } from "../../../schemas/courseManagement.schema";

const SemesterRegistration = () => {
  const methods = useForm({
    resolver: zodResolver(semesterRegistrationSchema),
  });
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const {data: semestersData} = useGetSemestersQuery([
    {name: "sort", value: "year"}
  ]);

  const semesterOptions = semestersData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}-${item.year}`  
  })) || [];
  

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const toastId = toast.loading("Creating..");
    const formatedData = {
      ...data,
      startDate: data.startDate?.toISOString(),
      endDate: data.endDate?.toISOString(),
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    }

    try{
      const res = await addSemesterRegistration(formatedData)  as TResponse<TSemesterRegistration>;

      if(res.error){
        toast.error(res.error?.data?.message, {id: toastId});
      }else{
        toast.success("Registered Successfully", {id: toastId})
        methods.reset();
      }
    }catch(err: any){
      toast.error(err.error, {id: toastId});
    }
  };

  return (
    <>
    <h1>Register a Semester</h1>
    <Flex style={{ minHeight: "70vh" }} justify="center" align="center">
      <Col span={12}>
          <UMSForm 
          onSubmit={onSubmit} 
          methods={methods}
          >
          <UMSSelect
            name="academicSemester"
            label="Academic Semester :"
            options={semesterOptions}
          />
          <UMSDate
            name="startDate"
            label="Start Date"
          />
            <UMSDate
              name="endDate"
              label="End Date"
            />
            <UMSInput
            type="number"
            name="minCredit"
            label="Minimum Credit :"
          />
            <UMSInput
            type="number"
            name="maxCredit"
            label="Maximum Credit :"
          />
          <Button htmlType="submit" size="large">Submit</Button>
        </UMSForm>
      </Col>
    </Flex>
    </>
  );
};

export default SemesterRegistration;
